/**
 * Mega Menu Data — Redheart
 * Each top-level item has groups with subheadings and items
 */

export const MEGA_MENU = [
  {
    title: 'Flowers',
    url: '/flowers',
    groups: [
      {
        heading: 'Shop by Type',
        items: [
          { label: 'Flower Bouquets',    url: '/flowers/bouquets' },
          { label: 'Hot Picks',          url: '/flowers/hot-picks' },
          { label: 'Best Sellers',       url: '/flowers/best-sellers' },
          { label: 'New Arrivals',       url: '/flowers/new-arrivals' },
        ],
      },
      {
        heading: 'Shop by Variety',
        items: [
          { label: 'Roses',              url: '/flowers/roses' },
          { label: 'Lilies',             url: '/flowers/lilies' },
          { label: 'Carnations',         url: '/flowers/carnations' },
          { label: 'Roses & Carnation',  url: '/flowers/roses-and-carnation' },
          { label: 'Roses & Lily',       url: '/flowers/roses-and-lily' },
        ],
      },
      // Shop by Color — hidden until product_attributes.color is populated in DB
      // { heading: 'Shop by Color', items: [
      //   { label: 'Red Flowers',    url: '/flowers/red' },
      //   { label: 'White Flowers',  url: '/flowers/white' },
      //   { label: 'Pink Flowers',   url: '/flowers/pink' },
      //   { label: 'Yellow Flowers', url: '/flowers/yellow' },
      //   { label: 'Purple Flowers', url: '/flowers/purple' },
      //   { label: 'Mixed Flowers',  url: '/flowers/mixed' },
      // ]},
      {
        heading: 'Shop by Occasion',
        items: [
          { label: 'Birthday Flowers',      url: '/flowers/birthday' },
          { label: 'Anniversary Flowers',   url: '/flowers/anniversary' },
          { label: 'Wedding Flowers',       url: '/flowers/wedding' },
          { label: 'Valentine Flowers',     url: '/flowers/valentine' },
          { label: 'Love & Romance',        url: '/flowers/love-and-romance' },
          { label: 'Congratulations',       url: '/flowers/congratulations' },
          { label: 'Get Well Soon',         url: '/flowers/get-well-soon' },
          { label: 'Thank You',             url: '/flowers/thank-you' },
          { label: 'House Warming',         url: '/flowers/house-warming' },
          { label: 'Baby Shower',           url: '/flowers/baby-shower' },
          { label: 'Appreciation',          url: '/flowers/appreciation' },
          { label: 'Cheer Up',              url: '/flowers/cheer-up' },
        ],
      },
      {
        heading: 'Shop by Relationship',
        items: [
          { label: 'For Her',          url: '/flowers/for-her' },
          { label: 'For Him',          url: '/flowers/for-him' },
          { label: 'For Wife',         url: '/flowers/for-wife' },
          { label: 'For Husband',      url: '/flowers/for-husband' },
          { label: 'For Mother',       url: '/flowers/for-mother' },
          { label: 'For Father',       url: '/flowers/for-father' },
          { label: 'For Girlfriend',   url: '/flowers/for-girlfriend' },
          { label: 'For Boyfriend',    url: '/flowers/for-boyfriend' },
          { label: 'For Friends',      url: '/flowers/for-friends' },
          { label: 'For Kids',         url: '/flowers/for-kids' },
        ],
      },
      {
        heading: 'Shop by Festival',
        items: [
          { label: "Valentine's Day",  url: '/flowers/valentines-day' },
          { label: 'Rose Day',         url: '/flowers/rose-day' },
          { label: "Mother's Day",     url: '/flowers/mothers-day' },
          { label: "Women's Day",      url: '/flowers/womens-day' },
          { label: 'Christmas',        url: '/flowers/christmas' },
          { label: 'New Year',         url: '/flowers/new-year' },
          { label: 'Holi',             url: '/flowers/holi' },
          { label: 'Eid',              url: '/flowers/eid-al-fitr' },
          { label: "Father's Day",     url: '/flowers/fathers-day' },
          { label: 'Lohri',            url: '/flowers/lohri' },
        ],
      },
      {
        heading: 'Popular',
        items: [
          { label: 'Red Roses',            url: '/flowers/red-roses' },
          { label: 'Pink Roses',           url: '/flowers/pink-roses' },
          { label: 'White Lilies',         url: '/flowers/white-lilies' },
          { label: 'Birthday Roses',       url: '/flowers/birthday-roses' },
          { label: 'Anniversary Roses',    url: '/flowers/anniversary-roses' },
        ],
      },
    ],
  },

  {
    title: 'Cakes',
    url: '/cakes',
    groups: [
      {
        heading: 'Shop by Type',
        items: [
          { label: 'Hot Picks',        url: '/cakes/hot-picks' },
          { label: 'Best Sellers',     url: '/cakes/best-sellers' },
          { label: 'New Arrivals',     url: '/cakes/new-arrivals' },
        ],
      },
      {
        heading: 'Shop by Flavour',
        items: [
          { label: 'Black Forest',     url: '/cakes/black-forest' },
          { label: 'Chocolate',        url: '/cakes/chocolate' },
          { label: 'Red Velvet',       url: '/cakes/red-velvet' },
          { label: 'Ferrero Rocher',   url: '/cakes/ferrero-rocher' },
          { label: 'Pinata',           url: '/cakes/pinata' },
        ],
      },
      {
        heading: 'Shop by Occasion',
        items: [
          { label: 'Birthday Cakes',      url: '/cakes/birthday' },
          { label: 'Anniversary Cakes',   url: '/cakes/anniversary' },
          { label: 'Wedding Cakes',       url: '/cakes/wedding' },
          { label: 'Valentine Cakes',     url: '/cakes/valentine' },
          { label: 'Congratulations',     url: '/cakes/congratulations' },
          { label: 'Get Well Soon',       url: '/cakes/get-well-soon' },
          { label: 'Thank You',           url: '/cakes/thank-you' },
          { label: 'House Warming',       url: '/cakes/house-warming' },
          { label: 'Baby Shower',         url: '/cakes/baby-shower' },
          { label: 'Appreciation',        url: '/cakes/appreciation' },
          { label: 'Cheer Up',            url: '/cakes/cheer-up' },
          { label: 'I Am Sorry',          url: '/cakes/i-am-sorry' },
        ],
      },
      {
        heading: 'Shop by Relationship',
        items: [
          { label: 'For Her',          url: '/cakes/for-her' },
          { label: 'For Him',          url: '/cakes/for-him' },
          { label: 'For Wife',         url: '/cakes/for-wife' },
          { label: 'For Husband',      url: '/cakes/for-husband' },
          { label: 'For Mother',       url: '/cakes/for-mother' },
          { label: 'For Father',       url: '/cakes/for-father' },
          { label: 'For Girlfriend',   url: '/cakes/for-girlfriend' },
          { label: 'For Boyfriend',    url: '/cakes/for-boyfriend' },
          { label: 'For Friends',      url: '/cakes/for-friends' },
          { label: 'For Kids',         url: '/cakes/for-kids' },
          { label: 'For Brother',      url: '/cakes/for-brother' },
          { label: 'For Sister',       url: '/cakes/for-sister' },
        ],
      },
      {
        heading: 'Shop by Festival',
        items: [
          { label: "Valentine's Day",  url: '/cakes/valentines-day' },
          { label: "Mother's Day",     url: '/cakes/mothers-day' },
          { label: 'Christmas',        url: '/cakes/christmas' },
          { label: 'New Year',         url: '/cakes/new-year' },
          { label: "Women's Day",      url: '/cakes/womens-day' },
          { label: 'Eid',              url: '/cakes/eid-al-fitr' },
          { label: "Father's Day",     url: '/cakes/fathers-day' },
          { label: 'Holi',             url: '/cakes/holi' },
        ],
      },
      {
        heading: 'Popular',
        items: [
          { label: 'Birthday Chocolate Cake',    url: '/cakes/birthday-chocolate' },
          { label: 'Birthday Black Forest Cake', url: '/cakes/birthday-black-forest' },
          { label: 'Anniversary Red Velvet',     url: '/cakes/anniversary-red-velvet' },
        ],
      },
    ],
  },

  {
    title: 'Plants',
    url: '/plants',
    groups: [
      {
        heading: 'Shop by Type',
        items: [
          { label: 'Hot Picks',        url: '/plants/hot-picks' },
          { label: 'Best Sellers',     url: '/plants/best-sellers' },
          { label: 'New Arrivals',     url: '/plants/new-arrivals' },
        ],
      },
      {
        heading: 'Shop by Variety',
        items: [
          { label: 'Snake Plant',      url: '/plants/snake' },
          { label: 'Money Plant',      url: '/plants/money' },
          { label: 'Jade Plant',       url: '/plants/jade' },
          { label: 'Peace Lily',       url: '/plants/peace-lily' },
          { label: 'Syngonium',        url: '/plants/syngonium' },
          { label: 'Bonsai',           url: '/plants/bonsai' },
        ],
      },
      {
        heading: 'Shop by Occasion',
        items: [
          { label: 'Birthday Plants',     url: '/plants/birthday' },
          { label: 'Anniversary Plants',  url: '/plants/anniversary' },
          { label: 'Wedding Plants',      url: '/plants/wedding' },
          { label: 'House Warming',       url: '/plants/house-warming' },
          { label: 'Congratulations',     url: '/plants/congratulations' },
          { label: 'Get Well Soon',       url: '/plants/get-well-soon' },
          { label: 'Thank You',           url: '/plants/thank-you' },
          { label: 'Baby Shower',         url: '/plants/baby-shower' },
          { label: 'Appreciation',        url: '/plants/appreciation' },
          { label: 'Love & Romance',      url: '/plants/love-and-romance' },
          { label: 'Cheer Up',            url: '/plants/cheer-up' },
        ],
      },
      {
        heading: 'Shop by Relationship',
        items: [
          { label: 'For Her',          url: '/plants/for-her' },
          { label: 'For Him',          url: '/plants/for-him' },
          { label: 'For Wife',         url: '/plants/for-wife' },
          { label: 'For Husband',      url: '/plants/for-husband' },
          { label: 'For Mother',       url: '/plants/for-mother' },
          { label: 'For Father',       url: '/plants/for-father' },
          { label: 'For Girlfriend',   url: '/plants/for-girlfriend' },
          { label: 'For Boyfriend',    url: '/plants/for-boyfriend' },
          { label: 'For Friends',      url: '/plants/for-friends' },
          { label: 'For Kids',         url: '/plants/for-kids' },
        ],
      },
      {
        heading: 'Shop by Festival',
        items: [
          { label: "Valentine's Day",  url: '/plants/valentines-day' },
          { label: "Mother's Day",     url: '/plants/mothers-day' },
          { label: "Women's Day",      url: '/plants/womens-day' },
          { label: 'Christmas',        url: '/plants/christmas' },
          { label: 'New Year',         url: '/plants/new-year' },
          { label: 'Eid',              url: '/plants/eid-al-fitr' },
          { label: "Father's Day",     url: '/plants/fathers-day' },
        ],
      },
    ],
  },

  {
    title: 'Birthday',
    url: '/birthday',
    groups: [
      {
        heading: 'Shop by Category',
        items: [
          { label: 'Birthday Flowers',  url: '/birthday/flowers' },
          { label: 'Birthday Cakes',    url: '/birthday/cakes' },
          { label: 'Birthday Plants',   url: '/birthday/plants' },
        ],
      },
      {
        heading: 'Shop by Relationship',
        items: [
          { label: 'Gifts for Her',         url: '/birthday/gifts-for-her' },
          { label: 'Gifts for Him',         url: '/birthday/gifts-for-him' },
          { label: 'Gifts for Wife',        url: '/birthday/gifts-for-wife' },
          { label: 'Gifts for Husband',     url: '/birthday/gifts-for-husband' },
          { label: 'Gifts for Mother',      url: '/birthday/gifts-for-mother' },
          { label: 'Gifts for Father',      url: '/birthday/gifts-for-father' },
          { label: 'Gifts for Girlfriend',  url: '/birthday/gifts-for-girlfriend' },
          { label: 'Gifts for Boyfriend',   url: '/birthday/gifts-for-boyfriend' },
          { label: 'Gifts for Friends',     url: '/birthday/gifts-for-friends' },
          { label: 'Gifts for Brother',     url: '/birthday/gifts-for-brother' },
          { label: 'Gifts for Sister',      url: '/birthday/gifts-for-sister' },
          { label: 'Gifts for Kids',        url: '/birthday/gifts-for-kids' },
        ],
      },
      {
        heading: 'Popular Picks',
        items: [
          { label: 'Birthday Roses',          url: '/birthday/roses' },
          { label: 'Birthday Chocolate Cakes',url: '/birthday/chocolate-cakes' },
          { label: 'Birthday Surprise Gifts', url: '/birthday/surprise-gifts' },
        ],
      },
    ],
  },

  {
    title: 'Anniversary',
    url: '/anniversary',
    groups: [
      {
        heading: 'Shop by Category',
        items: [
          { label: 'Anniversary Flowers',  url: '/anniversary/flowers' },
          { label: 'Anniversary Cakes',    url: '/anniversary/cakes' },
          { label: 'Anniversary Plants',   url: '/anniversary/plants' },
        ],
      },
      {
        heading: 'Shop by Relationship',
        items: [
          { label: 'Gifts for Wife',        url: '/anniversary/gifts-for-wife' },
          { label: 'Gifts for Husband',     url: '/anniversary/gifts-for-husband' },
          { label: 'Gifts for Parents',     url: '/anniversary/gifts-for-parents' },
          { label: 'Gifts for Her',         url: '/anniversary/gifts-for-her' },
          { label: 'Gifts for Him',         url: '/anniversary/gifts-for-him' },
          { label: 'Gifts for Girlfriend',  url: '/anniversary/gifts-for-girlfriend' },
          { label: 'Gifts for Boyfriend',   url: '/anniversary/gifts-for-boyfriend' },
          { label: 'Gifts for Friends',     url: '/anniversary/gifts-for-friends' },
        ],
      },
      {
        heading: 'Popular Picks',
        items: [
          { label: 'Anniversary Roses',        url: '/anniversary/roses' },
          { label: 'Anniversary Red Velvet',   url: '/anniversary/red-velvet' },
          { label: 'Anniversary Surprises',    url: '/anniversary/surprise-gifts' },
        ],
      },
    ],
  },

  {
    title: 'Wedding',
    url: '/wedding',
    groups: [
      {
        heading: 'Shop by Category',
        items: [
          { label: 'Wedding Flowers',   url: '/wedding/flowers' },
          { label: 'Wedding Plants',    url: '/wedding/plants' },
          { label: 'Wedding Cakes',     url: '/wedding/cakes' },
        ],
      },
      {
        heading: 'Wedding Flowers',
        items: [
          { label: 'Roses',             url: '/flowers/wedding' },
          { label: 'Lilies',            url: '/wedding/lilies' },
          { label: 'Carnations',        url: '/wedding/carnations' },
          { label: 'Roses & Carnation', url: '/wedding/roses-and-carnation' },
        ],
      },
      {
        heading: 'Wedding Plants',
        items: [
          { label: 'Peace Lily Plant',  url: '/wedding/peace-lily' },
          { label: 'Money Plant',       url: '/wedding/money' },
          { label: 'Jade Plant',        url: '/wedding/jade' },
          { label: 'Bonsai',            url: '/wedding/bonsai' },
          { label: 'Snake Plant',       url: '/wedding/snake' },
        ],
      },
      {
        heading: 'Shop by Relationship',
        items: [
          { label: 'Gifts for Her',         url: '/wedding/for-her' },
          { label: 'Gifts for Him',         url: '/wedding/for-him' },
          { label: 'Gifts for Wife',        url: '/wedding/for-wife' },
          { label: 'Gifts for Husband',     url: '/wedding/for-husband' },
          { label: 'Gifts for Mother',      url: '/wedding/for-mother' },
          { label: 'Gifts for Father',      url: '/wedding/for-father' },
          { label: 'Gifts for Friends',     url: '/wedding/for-friends' },
          { label: 'Gifts for Girlfriend',  url: '/wedding/for-girlfriend' },
          { label: 'Gifts for Boyfriend',   url: '/wedding/for-boyfriend' },
        ],
      },
      {
        heading: 'Popular Picks',
        items: [
          { label: 'Wedding Roses',         url: '/wedding/roses' },
          { label: 'Wedding Bouquets',      url: '/wedding/bouquets' },
          { label: 'Wedding Surprise',      url: '/wedding/surprise-gifts' },
        ],
      },
    ],
  },

  // Hampers — hidden until products are added to the DB
  // Uncomment below to restore:
  // { title: 'Hampers', url: '/hampers', groups: [...] }
];
