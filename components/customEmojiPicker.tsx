import { Button } from "@mui/material";
import { useEmojiPicker, EmojiPicker } from "@welcome-ui/emoji-picker";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type UserPickerProps = {
	emojis: EmojiUser[];
	setEmojis: Dispatch<SetStateAction<EmojiUser[]>>;
	choiceList: EmojiUser[];
};

export type EmojiUser = {
	alias: string;
	url: string;
};

export function CustomEmojiPicker({
	emojis,
	setEmojis,
	choiceList
}: UserPickerProps) {
	const emojiPicker = useEmojiPicker();

	return (
		<>
			<div className="flex">
				<div className="flex gap-1">
					{emojis.length > 0
						? emojis.map((emoji, index) => {
								return (
									<div key={index} className="relative">
										<p
											onClick={() => {
												setEmojis((emojis) => {
													return emojis.filter(
														(deleteEmoji) => {
															return !(
																deleteEmoji.alias ==
																emoji.alias
															);
														}
													);
												});
											}}
											className="absolute right-[2px] font-bold text-red-600"
										>
											X
										</p>
										<img
											className="h-8 w-8"
											src={emoji.url || ""}
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
					onChange={(emojiAlias) => {
						const alias = emojiAlias as string;
						// wtf is this bullshit; should work with only one call to replace
						const checkString = alias
							.replace(":", "")
							.replace(":", "");
						setEmojis((prev) => {
							return [
								...prev,
								choiceList.find(
									(emoji) => emoji.alias == checkString
								) as EmojiUser
							];
						});
					}}
					{...emojiPicker}
				>
					{/* @ts-ignore */}
					<EmojiPicker.Tab name="Custom">
						{/* @ts-ignore */}
						<EmojiPicker.List emojis={choiceList} />
					</EmojiPicker.Tab>
				</EmojiPicker>
			</div>
		</>
	);
}
