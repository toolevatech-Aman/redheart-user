import { menuData } from "../../constants/menuData";

export const getPayloadKeyByItemName = ( itemName) => {
  if (!itemName) return null;

  // Map item.category field to API payload key
  const categoryToPayloadKey = {
    "SubCategoryFilters": "subcategory_name",
    "festival": "festival_tags",
    "special": "special_occasion_tags",
    "occasion": "occasion_tags",
    "type": "type",
    "relationship": "relationship",
    "color": "color",
  };

  for (const section of menuData) {
    const foundItem = section.items.find(
      (item) => item.name.toLowerCase() === itemName.toLowerCase()
    );

    if (foundItem && foundItem.category && categoryToPayloadKey[foundItem.category]) {
      return {
        payloadKey: categoryToPayloadKey[foundItem.category],
        value: itemName,
      };
    }
  }

  return null; // if not found
};
