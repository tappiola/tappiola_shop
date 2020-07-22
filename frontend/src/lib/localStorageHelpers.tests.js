import {getUpdatedCartItems, ADDED_SUCCESSFULLY_MSG, NO_MORE_ITEMS_MSG} from './localStorageHelpers';
import assert from 'assert';

describe('localStorageHelpers', function () {

    it('add item of new type - cart is updated', function () {
      assert.deepStrictEqual(
          getUpdatedCartItems(
              [],
              {"id":5,"size":"one_size","quantity":1},
              10),
          [
              [{"id":5,"size":"one_size","quantity":1}],
              ADDED_SUCCESSFULLY_MSG]
      );
    });

    it('add item of new type - previous carts items are not lost', function () {
      assert.deepStrictEqual(
          getUpdatedCartItems(
              [{"id":6,"size":"32","quantity":1}],
              {"id":5,"size":"one_size","quantity":1},
              10),
          [
              [{"id":6,"size":"32","quantity":1}, {"id":5,"size":"one_size","quantity":1}],
              ADDED_SUCCESSFULLY_MSG]
      );
    });

    it('add item of same type, other size - previous carts items are not lost', function () {
      assert.deepStrictEqual(
          getUpdatedCartItems(
              [{"id":5,"size":"32","quantity":1}],
              {"id":5,"size":"34","quantity":1},
              10),
          [
              [{"id":5,"size":"32","quantity":1}, {"id":5,"size":"34","quantity":1}],
              ADDED_SUCCESSFULLY_MSG]
      );
    });

    it('add item of same type, same size - quantity should be summed up', function () {
      assert.deepStrictEqual(
          getUpdatedCartItems(
              [{"id":6,"size":"32","quantity":3}],
              {"id":6,"size":"32","quantity":2},
              10),
          [
              [{"id":6,"size":"32","quantity":5}],
              ADDED_SUCCESSFULLY_MSG]
      );
    });

    it('add item not enough stock - quantity should be maximum in stock', function () {
      assert.deepStrictEqual(
          getUpdatedCartItems(
              [{"id":6,"size":"32","quantity":3}],
              {"id":6,"size":"32","quantity":4},
              5),
          [
              [{"id":6,"size":"32","quantity":5}],
              NO_MORE_ITEMS_MSG]
      );
    });
  });
