import { menuData } from "../../constants/menuData";

export const getPayloadKeyByItemName = ( itemName) => {
  // Map navbar title to payload key
  const titleToPayloadKey = {
    "Shop by Flower Type": "subcategory_name",
    "Cakes": "subcategory_name",
    "Combos": "subcategory_name",
    "Loved Ones": "relationship",
    "Festival": "festival_tags",
    "Special Occasion": "occasion_tags",
    "Occasion": "occasion_tags",
    "Category":"category_name"
  };

  for (const section of menuData) {
    const foundItem = section.items.find(
      (item) => item.name.toLowerCase() === itemName.toLowerCase()
    );

    if (foundItem) {
      return {
        payloadKey: titleToPayloadKey[section.title],
        value: itemName,
      };
    }
  }

  return null; // if not found
};
