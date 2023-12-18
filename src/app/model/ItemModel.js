const PriceRange = [
    '$10 - $100',
    '$100 - $500',
    '$500 - $1000',
    '$1000 - $5000',
    '$5000 - $10000'
];

const Category = ['Clothes', 'Accessory', 'Handphone', 'Laptop'];

const ItemsTableHeader = [
    {
        id: 'image',
        align: 'left',
        label: 'Image'
    },
    {
        id: 'name',
        align: 'left',
        label: 'Name'
    },
    {
        id: 'category',
        align: 'left',
        label: 'Category'
    },
    {
        id: 'price',
        align: 'left',
        label: 'Subtotal'
    },
    {
        id: 'quantity',
        align: 'left',
        label: 'Quantity'
    },
    {
        id: 'active',
        align: 'left',
        label: 'Active'
    }
];

export { PriceRange, Category, ItemsTableHeader };
