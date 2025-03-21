import { ulid } from "ulid";
import { err } from "../../../common/utils";
import { type User, isExpiredFriendInviteToken } from "../../../domain/entities";
import { createPack } from "../../../domain/entities";
import { newFriendshipId, newPackId } from "../../../domain/value-object";
import type { IFriendInviteTokenRepository } from "../../../interface-adapter/repositories/friend-invite-token";
import type { IImageRepository } from "../../../interface-adapter/repositories/image";
import type { IPackRepository } from "../../../interface-adapter/repositories/pack";
import type { IUserRepository } from "../../../interface-adapter/repositories/user";
import { generatePackImage, packDefaultImage } from "../../services/generate-image";
import type { ApplyFriendUseCaseResult, IApplyFriendUseCase } from "./interfaces/apply-friend.usecase.interface";

export class ApplyFriendUseCase implements IApplyFriendUseCase {
	constructor(
		private readonly friendInviteTokenRepository: IFriendInviteTokenRepository,
		private readonly userRepository: IUserRepository,
		private readonly packRepository: IPackRepository,
		private readonly imageRepository: IImageRepository,
	) {}

	public async execute(token: string, user: User): Promise<ApplyFriendUseCaseResult> {
		const { user: friendUser, friendInviteToken } =
			await this.friendInviteTokenRepository.findFriendInviteTokenAndUserByToken(token);

		if (!friendUser || !friendInviteToken) {
			return err("INVALID_TOKEN");
		}

		const friendship = await this.userRepository.findFriendshipByUserIds(user.id, friendUser.id);

		if (friendship) {
			return err("ALREADY_FRIENDED");
		}

		await this.friendInviteTokenRepository.deleteByUserId(friendUser.id);

		if (isExpiredFriendInviteToken(friendInviteToken)) {
			return err("TOKEN_IS_EXPIRED");
		}

		const friendshipId = newFriendshipId(ulid());

		const [userCreatedPackImage, friendCreatedPackImage] = await Promise.all([
			this.generatePackImageByUser(friendUser),
			this.generatePackImageByUser(user),
			this.userRepository.addFriend({
				id: friendshipId,
				user1: user.id,
				user2: friendUser.id,
			}),
		]);

		const userCreatedPack = createPack({
			id: newPackId(ulid()),
			title: `${friendUser.name} Pack`,
			ownerId: user.id,
			friendshipId,
			cards: [],
		});

		const friendCreatedPack = createPack({
			id: newPackId(ulid()),
			title: `${user.name} Pack`,
			ownerId: friendUser.id,
			friendshipId,
			cards: [],
		});

		await Promise.all([
			this.imageRepository.save(userCreatedPackImage.buffer, userCreatedPack.id, userCreatedPackImage.type),
			this.imageRepository.save(friendCreatedPackImage.buffer, friendCreatedPack.id, friendCreatedPackImage.type),
			this.packRepository.save(userCreatedPack),
			this.packRepository.save(friendCreatedPack),
		]);
	}

	private async generatePackImageByUser(user: User): Promise<{
		buffer: Buffer<ArrayBufferLike>;
		type: "jpeg" | "png";
	}> {
		const { name, iconUrl } = user;

		const title = `${name} Pack`;

		if (!iconUrl) {
			return { buffer: await this.generateDefaultPackImage(title), type: "png" };
		}

		const res = await fetch(iconUrl);

		const resType = res.headers.get("content-type");

		let type: "unknown" | "jpeg" | "png" = "unknown";

		if (!resType) {
			return { buffer: await this.generateDefaultPackImage(title), type: "png" };
		}

		if (resType === "image/jpeg") {
			type = "jpeg";
		}
		if (resType === "image/png") {
			type = "png";
		}

		if (type === "unknown") {
			return { buffer: await this.generateDefaultPackImage(title), type: "png" };
		}

		try {
			const arrayBuffer = await res.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			return { buffer: await generatePackImage(title, buffer, type), type };
		} catch {
			return { buffer: await this.generateDefaultPackImage(title), type: "png" };
		}
	}

	private async generateDefaultPackImage(title: string): Promise<Buffer<ArrayBufferLike>> {
		return generatePackImage(title, packDefaultImage, "png");
	}
}
