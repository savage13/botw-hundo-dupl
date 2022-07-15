import { createMaterialStack } from "./ItemStack";
import { Item, ItemStack, ItemTab, ItemType } from "./type";

const TypeToCount: Omit<{
    [t in ItemType]: number
}, ItemType.Flag> = {
	[ItemType.Weapon]: 0,
	[ItemType.Bow]: 0,
	[ItemType.Arrow]: 0,
	[ItemType.Shield]: 0,
	[ItemType.ArmorUpper]: 0,
    [ItemType.ArmorMiddle]: 0,
    [ItemType.ArmorLower]: 0,
	[ItemType.Material]: 0,
    [ItemType.Food]: 0,
	[ItemType.Key]: 0,
};

export class ItemImpl implements Item {
    id: string;
    type: ItemType;
    get tab(): ItemTab {
        switch(this.type){
            case ItemType.Weapon:
                return ItemTab.Weapon;
            case ItemType.Bow:
            case ItemType.Arrow:
                return ItemTab.Bow;
            case ItemType.Shield:
                return ItemTab.Shield;
            case ItemType.ArmorUpper:
            case ItemType.ArmorMiddle:
            case ItemType.ArmorLower:
                return ItemTab.Armor;
            case ItemType.Material:
                return ItemTab.Material;
            case ItemType.Food:
                return ItemTab.Food;
            case ItemType.Key:
                return ItemTab.Key;
            default:
                return ItemTab.None
        }
    }
    repeatable: boolean;
    stackable: boolean;
    sortOrder: number = -1;
    image: string;
    configuredAnimatedImage?: string;
    constructor(id: string, type: ItemType, repeatable: boolean, stackable: boolean, image: string, animatedImage: string|undefined){
        this.id = id;
        this.type = type;
        this.repeatable = repeatable;
        this.stackable = stackable;
        this.image = image;
        this.configuredAnimatedImage = animatedImage;
        if(type !== ItemType.Flag){
            this.sortOrder = TypeToCount[type];
            TypeToCount[type]++;
        }
    }

    get animatedImage(): string {
        return this.configuredAnimatedImage || this.image;
    }

    createDefaultStack(): ItemStack {
        // TODO: durability, cook data, etc
        return createMaterialStack(this, 0);
    }
    
}
