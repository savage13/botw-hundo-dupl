// Type of the item
export enum ItemType {
    Weapon = 0,
    Bow = 1,
    Arrow = 2,
    Shield = 3,
    ArmorUpper = 4,
    ArmorMiddle = 5,
    ArmorLower = 6,
    Material = 7,
    Food = 8,
    Key = 9,
    Flag = -1 // flags in game data, not actual items. such as HasRitoSoulPlus
};
// Which tab the item is in. These specifically matches ItemType in case we need it in the future
export enum ItemTab {
    Weapon = 0,
    Bow = 1,
    Shield = 3,
    Armor = 4,
    Material = 7,
    Food = 8,
    Key = 9,
    None = -1,
};
export interface Item {
    // The id of Item, which is its name in UpperCamelCase in English as it appears in English, with special characters like ' removed and + turned into Plus
    // The only special case is that the key item Thunderhelm is named ThunderHelmKey
    readonly id: string,
    // The type of the item
    readonly type: ItemType
    // if this is false, the item will not be added to pouch if one already exists
    readonly repeatable: boolean,
    // if the item is stackable
    readonly stackable: boolean,
    // sort order of the item
    readonly sortOrder: number,
    // which tab the item is in
    readonly tab: ItemTab,
    // webpack loaded image
    readonly image: string,
    // animated image. If the item is not animated, this is the same as image
    readonly animatedImage: string,
    // create item stack with this item and default metadata (durability and default state for weapons, cookdata for meals, etc)
    createDefaultStack(): ItemStack,
}

// ItemStack is an immutable object holding information of a slot
export interface ItemStack {
    // type of the item
    readonly item: Item,
    // how many in slot. for weapon, this is durability*100
    readonly count: number,
    // durability of equipment. for material, this is count/100
    readonly durability: number,
    // if slot is equipped
    readonly equipped: boolean,
    // function to create a new stack based on this stack and option
    modify(option: Partial<ItemStack>): ItemStack,
    // check if 2 stacks are equal: same item, count, equipped nd metadata
    equals(other: ItemStack): boolean,
    // check if everything equals except for equipped
    equalsExceptForEquipped(other: ItemStack): boolean,
}


