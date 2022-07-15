import { Item, ItemType } from "./type";

type ItemData = {
	item: string,
	image: string,
	type: ItemType,
	repeatable: boolean,
	stackable: boolean,
    animated: boolean
	animatedImage?: string,
	sortOrder: number,
}

const ItemToData: Record<string, ItemData> = {};

export const deprecatedRegister = (item: Item) => {
	const sortOrder = -1;//TypeToCount[type];
	//TypeToCount[type]++;
	const data: ItemData = {
		item: item.id,
		type: item.type,
		repeatable: item.repeatable,
		stackable: item.stackable,
		animated: item.animatedImage !== item.image,
		sortOrder,
		animatedImage: item.animatedImage,
		image: item.image
	};
	ItemToData[item.id] = data;
};

export const itemToItemData = (item: Item): ItemData => ItemToData[item.id] as ItemData;
export const itemExists = (item: Item): boolean => !!itemToItemData(item);
// export const itemToArrowType = (item: Item): string => {
// 	if(itemToItemData(item).type === ItemType.Arrow){
// 		const str = `${item}`;
// 		return str.substring(0,str.length-5);
// 	}
// 	return "";
// };

export const getAllItems = (): string[] => Object.keys(ItemToData);
