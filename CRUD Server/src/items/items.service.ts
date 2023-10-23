// Data Model Interfaces
import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";
// In-Memory Store
let items: Items = {
 1: {
   id: 1,
   name: "Burger",
   price: 599,
   description: "A patty of ground beef grilled and placed between two halves of a bun. Slices of raw onion, lettuce, bacon, mayonnaise, and other ingredients add flavor.",
   image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
 },
 2: {
   id: 2,
   name: "Pizza",
   price: 299,
   description: "Consists of a flattened disk of bread dough topped with some combination of olive oil, oregano, tomato, olives, mozzarella or other cheese, and many other ingredients, baked quickly—usually, in a commercial setting, using a wood-fired oven heated to a very high temperature—and served hot.",
   image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
 },
 3: {
   id: 3,
   name: "Tea",
   price: 199,
   description: "An aromatic beverage prepared by pouring hot or boiling water over cured or fresh leaves, and became fashionable among the English, who started to plant tea on a large scale in British India.",
   image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
 }
};

// Service Methods
export const findAll = async (): Promise<Item[]> => Object.values(items);

export const find = async (id: number): Promise<Item> => items[id];

export const search = async (search: string): Promise<Item[]> => Object.values(items).filter(item => item.name.toLowerCase().includes(search));

export const create = async (newItem: BaseItem): Promise<Item> => {
  const id = new Date().valueOf();

  items[id] = {
    id,
    ...newItem,
  };

  return items[id];
};

export const update = async (
  id: number,
  itemUpdate: BaseItem
): Promise<Item | null> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  items[id] = { id, ...itemUpdate };

  return items[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  delete items[id];
};