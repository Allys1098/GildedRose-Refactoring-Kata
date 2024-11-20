import { Item, GildedRose } from '@/gilded-rose';

function itemTest(item, sellIn, quality, sellInRes, qualityRes){
    const gildedRose = new GildedRose([new Item(item, sellIn, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(sellInRes);
    expect(items[0].quality).toBe(qualityRes);
}

describe('Gilded Rose', () => {
  // Test written by original dev
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  // If sellin is negative, Quality degrades by 2
  it('Quality degradation after sellin expiration', () => {
    itemTest('rotten apple', -1, 2, -2, 0)
  })

  // "Aged Brie" increases in quality with age
  it('Aged Brie increases in quality with age', () => {
    itemTest("Aged Brie", 2, 4, 1, 5)
  })

  // "Aged Brie" increases in quality with age
  it('Aged Brie increases in quality with age', () => {
    itemTest("Aged Brie", -1, 4, -2, 6)
  })
  
  // "Sulfuras" never decreases in quality
  it('Sulfuras never decreases in quality', () => {
    itemTest("Sulfuras, Hand of Ragnaros", 1, 5, 1, 5)
  })

  //If quality is negative, quality stays the same
  it('Quality is negative', () => {
    itemTest('evil lemons', 0, -1, -1, 0)
  })
});

describe('Backstage passes tests', () => {

  // "Backstage passes increase normally in quality when the concert is at least 10 days away.
  it('BP with min 10 days to concert', () => {
    itemTest("Backstage passes to a TAFKAL80ETC concert", 21, 5, 20, 6);
  })

  // "Backstage passes increase by 2 when between 5 or 10 days
  it('BP with 5 to 10 days to concert', () => {
    itemTest("Backstage passes to a TAFKAL80ETC concert", 7, 5, 6, 7);
  })

  // "Backstage passes increase normally in quality when the concert is at least 10 days away.
  it('BP with less than 5 days to concert', () => {
    itemTest("Backstage passes to a TAFKAL80ETC concert", 3, 5, 2, 8);
  })

  // "Backstage passes increase normally in quality when the concert is at least 10 days away.
  it('BP with concert passed by', () => {
    itemTest("Backstage passes to a TAFKAL80ETC concert", -1, 5, -2, 0);
  })
});

