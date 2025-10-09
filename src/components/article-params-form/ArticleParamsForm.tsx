import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useRef, useState } from 'react';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	onSubmit: (state: typeof defaultArticleState) => void;
	onReset: () => void;
	currentState: typeof defaultArticleState;
}

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
	currentState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidthArr, setSelectedContentWidthArr] = useState(
		defaultArticleState.contentWidth
	);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setSelectedFont(currentState.fontFamilyOption);
		setSelectedFontSize(currentState.fontSizeOption);
		setSelectedFontColor(currentState.fontColor);
		setSelectedBackgroundColor(currentState.backgroundColor);
		setSelectedContentWidthArr(currentState.contentWidth);
	}, [currentState]);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onChange: setIsOpen,
	});

	const handleSubmitClick = (event: React.FormEvent) => {
		event.preventDefault();
		const newState = {
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidthArr,
		};
		onSubmit(newState);
		setIsOpen(false);
	};

	const handleResetClick = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidthArr(defaultArticleState.contentWidth);
		onReset();
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					toggleSidebar();
				}}
			/>
			<aside
				ref={sidebarRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmitClick}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectedFont}
						onChange={setSelectedFont}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={selectedFontSize}
						name='radio'
						onChange={setSelectedFontSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={selectedContentWidthArr}
						onChange={setSelectedContentWidthArr}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetClick}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
