// @ts-nocheck

import { Button } from "@mui/material";
import { useEmojiPicker, EmojiPicker } from "@welcome-ui/emoji-picker";
import { Emoji } from "@welcome-ui/emoji";
import { useState } from "react";

export function Custom() {
	const emojiPicker = useEmojiPicker();
	const [emojis, setEmojis] = useState([]);
	const [emoji, setEmoji] = useState();

	const emojiData = [
		{
			alias: "chirag",
			url: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
		},
		{
			alias: "christie",
			url: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
		},
		{
			alias: "mustafa",
			url: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
		},
		{
			alias: "ashvanatha",
			url: "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png",
		},
	];

	return (
		<>
			<div className="flex">
				<div className="flex gap-1">
					{emojis.length > 0
						? emojis.map((emoji) => {
								const currentEmoji = emojiData.find(
									({ alias }) => `:${alias}:` === emoji
								);
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
										<Emoji emoji={currentEmoji.url || currentEmoji.alias} />
									</div>
								);
						  })
						: "(select here)"}
				</div>
				<EmojiPicker.Trigger as={Button} {...emojiPicker}>
					<p className="text-3xl font-bold">+</p>
				</EmojiPicker.Trigger>
				<EmojiPicker
					onChange={(emoji) => {
						setEmojis((emojis) => {
							return [...emojis, emoji];
						});
					}}
					{...emojiPicker}
				>
					<EmojiPicker.Tab name="Custom">
						<EmojiPicker.List emojis={emojiData} />
					</EmojiPicker.Tab>
				</EmojiPicker>
			</div>
		</>
	);
}
