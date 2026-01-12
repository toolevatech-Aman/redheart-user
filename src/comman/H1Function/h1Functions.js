// Complete lookup object for all categories
const categoryDescriptions = {
    // Plants
    "Plants": "Plants Delivery",
    "Flowers": "Flower Delivery",
    "Cakes": "Cake Delivery",
    "Gifts": "Gifts Online",
    "Hampers": "Gift Hampers Online",
    "Chocolate Gifts": "Chocolate Gifts Online",
    "Combos": "Combos Delivery",
    "Roses": "Roses Online",
    "Lilies": "Lilies Online",
    "Orchids": "Orchids Online",
    "Mixed": "Mixed Flowers Online",
    "Carnation": "Carnation Online",
    "Gerbera": "Gerbera Online",
    "Bonsai": "Bonsai Plants Online",
    "Lucky": "Lucky Plants Online",
    "Jade": "Jade Plants Online",
    "Money": "Money Plants Online",
    "Terrarium": "Terrarium Plants Online",
    "Lily": "Lily Plants Online",
    "Snake": "Snake Plants Online",
    "Succulents": "Succulents Plants Online",
    "Syngonium": "Syngonium Plants Online",

    // Cakes
    "Chocolate Cakes": "Chocolate Cakes Online",
    "Butterscotch Cakes": "Butterscotch Cakes Online",
    "Black Forest Cakes": "Black Forest Cakes Online",
    "Fruit Cakes": "Fruit Cakes Online",
    "Cheesecakes": "Cheesecakes Online",
    "Pineapple Cakes": "Pineapple Cakes Online",
    "Red Velvet Cakes": "Red Velvet Cakes Online",
    "Coffee Cakes": "Coffee Cakes Online",
    "Strawberry Cakes": "Strawberry Cakes Online",
    "KitKat Cakes": "Kitkat Cakes Online",
    "Vanilla Cakes": "Vanilla Cakes Online",
    "Ferrero Rocher Cakes": "Ferrero Rocher Cakes Online",
    "Blueberry": "Blueberry Cakes Online",
    "Rasmalai cake": "Rasmalai Cakes Online",
    "Chocolate truffle": "Chocolate Truffle Cakes Online",
    "Photo Cakes": "Photo Cakes Online",
    "Theme cake": "Theme Cakes Online",
    "Pinata cake": "Pinata Cakes Online",
    "Pull me up": "Pull Me Up Cakes Online",
    "Doll cake": "Doll Cake Cakes Online",

    // Combos & Gifts
    "Hamper": "Hamper Online",
    "Flowers & Cakes": "Flowers & Cakes Online",
    "Flowers & Chocolates": "Flowers & Chocolates Online",
    "Flowers & Teddy": "Flowers & Teddy Online",
    "All Flowers Combos": "All Flowers Combos Online",
    "Cakes & Teddy": "Cakes & Teddy Online",
    "All Cake Combos": "All Cake Combos Online",
    "Plants & Chocolates": "Plants & Chocolates Online",
    "Plants & Cakes": "Plants & Cakes Online",
    "Plants & Idols": "Plants & Idols Online",
    "All Plant Combos": "All Plant Combos Online",
    "Chocolates Gift": "Chocolates Gift Online",

    // Occasion Gifts
    "Birthday": "Birthday Gifts",
    "Anniversary": "Anniversary Gifts",
    "Wedding": "Wedding Gifts",
    "House Warming": "House Warming Gifts",
    "New Born Baby": "New Born Baby Gifts",
    "Baby Shower": "Baby Shower Gifts",
    "Appreciation": "Appreciation Gifts",
    "Cheer Up": "Cheer Up Gifts",
    "Congratulations": "Congratulations Gifts",
    "Get Well Soon": "Get Well Soon Gifts",
    "Love n Romance": "Love N Romance Gifts",
    "Thank You": "Thank You Gifts",

    // Recipient Gifts
    "Her": "Gifts For Her",
    "Him": "Gifts For Him",
    "Friends": "Gifts For Friends",
    "Wife": "Gifts For Wife",
    "Husband": "Gifts For Husband",
    "Kids": "Gifts For Kids",
    "Boyfriend": "Gifts For Boyfriend",
    "Girlfriend": "Gifts For Girlfriend",
    "Mother": "Gifts For Mother",
    "Father": "Gifts For Father",

    // Special Days
    "New Year": "New Year Gifts",
    "Republic Day": "Republic Day Gifts",
    "Rose Day": "Rose Day Gifts",
    "Propose Day": "Propose Day Gifts",
    "Chocolate Day": "Chocolate Day Gifts",
    "Teddy Day": "Teddy Day Gifts",
    "Promise Day": "Promise Day Gifts",
    "Hug Day": "Hug Day Gifts",
    "Kiss Day": "Kiss Day Gifts",
    "Valentine's Day": "Valentine's Day Gifts",
    "Womens Day": "Womens Day Gifts",
    "Doctors day": "Doctors Day Gifts",
    "Mothers Day": "Mothers Day Gifts",
    "Brother's Day": "Brother's Day Gifts",
    "Father's Day": "Father's Day Gifts",
    "Christmas": "Christmas Gifts",
    "Lohri": "Lohri Gifts",
    "Holi": "Holi Gifts",
    "Eid Al Fitr": "Eid Al Fitr Gifts",
    "Rakhi": "Rakhi Gifts"
};

// Generic JS function
export function getDescription(categoryName) {
    if (categoryDescriptions[categoryName]) {
        return categoryDescriptions[categoryName];
    } else {
        return categoryName + " Delivery"; // Default fallback
    }
}


