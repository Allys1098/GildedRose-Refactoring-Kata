export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  // Update the quality of all items in the items list
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.updateItemQuality(this.items[i])
    }

    return this.items;
  }


  // Update the quality of a single item
  updateItemQuality(item) {

    // Sulfurs never ages and does not have to be sold. 
    if (item.name == 'Sulfuras, Hand of Ragnaros') {
      return;
    }

    // Any other product has to be sold and thus needs the sellIn to be updated. 
    item.sellIn = item.sellIn - 1;

    // The quality of an item can't be negative
    if (item.quality <= 0) {
      item.quality = 0;
      return;
    }

    // All logic for Aged Brie
    if (item.name == 'Aged Brie') {
      this.addToQuality(item, 1)
      if (item.sellIn < 0) {
        this.addToQuality(item, 1)
      }
      // All logic for Backstage passes
    } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.sellIn < 0) {
        item.quality = 0
        return
      }
      this.addToQuality(item, 1)
      if (item.sellIn < 11) {
        this.addToQuality(item, 1)
      }
      if (item.sellIn < 6) {
        this.addToQuality(item, 1)
      }
      // All logic for other items
    } else {
      this.addToQuality(item, -1)
      if (item.sellIn < 0 && item.quality > 0){
        this.addToQuality(item, -1);
      }
    }
  }

  addToQuality(item, quantity) {
    if (item.quality < 50) {
      item.quality += quantity
    }
  }

  
}


