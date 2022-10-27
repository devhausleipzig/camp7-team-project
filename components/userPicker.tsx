import { User } from "@prisma/client";
import { methods } from "../utils/methods";
import { Button } from "@mui/material";
import { useEmojiPicker, EmojiPicker } from "@welcome-ui/emoji-picker";
import { Emoji } from "@welcome-ui/emoji";
import { useEffect, useState } from "react";
import { useGetUsers } from "../hooks/useGetUsers";

interface UserPickerProps {
	users: User[];
}

interface EmojiUser {
	alias: string;
	url: string;
}

export function UserPicker() {
	const emojiPicker = useEmojiPicker();
	const [emojis, setEmojis] = useState<String[]>([]);
	const [emoji, setEmoji] = useState();
	const { users } = useGetUsers();

	const [emojiUsers, setEmojiUsers] = useState<EmojiUser[]>([]);

	useEffect(() => {
		setEmojiUsers(
			users.map((user) => {
				return {
					alias: user.id,
					url: user.imageUrl,
				};
			})
		);
	}, [users]);
	// const emojiUsers: EmojiUser[] = users.map((user) => {
	// 	return {
	// 		alias: user.id,
	// 		url: user.imageUrl,
	// 	};
	// });

	return (
		<>
			<div className="flex">
				<div className="flex gap-1">
					{emojis.length > 0
						? emojis.map((emoji) => {
								// const currentEmoji = emojiUsers.find(
								// 	({ alias }) => `:${alias}:` === emoji
								// );
								return (
									<div className="relative">
										<p
											onClick={() => {
												setEmojis((emojis) => {
													return emojis.filter((deleteEmoji) => {
														console.log(deleteEmoji, emoji);
														return !(deleteEmoji == emoji);
													});
												});
											}}
											className="absolute right-[2px] font-bold text-red-600"
										>
											X
										</p>
										{/* <Emoji emoji={currentEmoji?.url} /> */}
										<img
											className="h-8 w-8"
											src={
												emojiUsers.find(
													(emojiUser) =>
														emojiUser.alias === emoji.replaceAll(":", "")
												)?.url || ""
											}
										></img>
									</div>
								);
						  })
						: "(select here)"}
				</div>
				<EmojiPicker.Trigger as={Button} {...emojiPicker}>
					<p className="text-3xl font-bold">+</p>
				</EmojiPicker.Trigger>
				{/* @ts-ignore */}
				<EmojiPicker
					onChange={(alias) => {
						console.log(emoji);
						setEmojis((prev) => {
							return [...prev, alias as string];
						});
					}}
					{...emojiPicker}
				>
					{/* @ts-ignore */}
					<EmojiPicker.Tab name="Custom">
						{/* @ts-ignore */}
						<EmojiPicker.List emojis={emojiUsers} />
					</EmojiPicker.Tab>
				</EmojiPicker>
			</div>
		</>
	);
}
