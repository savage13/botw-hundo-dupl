import { ItemStack, itemToItemData, ItemType } from "data/item";

export type DisplayableSlot = {
	// webpack image to display 
    image: string,
	// localization key for description
    descKey: string,
	// count of stack
    count: number,
	// if the count should be displayed
    displayCount: boolean,
	// if the stack is equipped
    isEquipped: boolean,
	// if the slot is broken (i.e in the count offset region)
    isBrokenSlot: boolean,
}

export interface DisplayableInventory {
    getDisplayedSlots: (isIconAnimated: boolean)=>DisplayableSlot[]
}

export const itemStackToDisplayableSlot = ({item, count, equipped}: ItemStack, isBrokenSlot: boolean, isIconAnimated: boolean): DisplayableSlot => {
	const data =  itemToItemData(item);
	return {
		image: isIconAnimated ? data.animatedImage ?? data.image : data.image,
		descKey: `items.${ItemType[data.type]}.${data.item}`,
		// for unstackable items (food/key items) display count if count > 1, even if it's unstackable
		displayCount: data.stackable ? data.type === ItemType.Arrow || count > 0 : count > 1,
		count,
		isEquipped: equipped,
		isBrokenSlot
	};
};
