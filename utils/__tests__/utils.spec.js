import { thousandths, formatDate } from '../index';

describe('Test utility functions', () => {
  describe('thousandths function tests', () => {
    it('should return the appropratite result for numbers < 1000', () => {
      const value = thousandths(100);
      expect(value).toBe(100);
    });

    it('should return the appropratite result for numbers > 1000', () => {
      const value = thousandths(2000);
      expect(value).toBe('2K');
    });

    it('should return the appropratite result for numbers > 1000000', () => {
      const value = thousandths(2000000);
      expect(value).toBe('2M');
    });
  });

  describe('formatDate function tests', () => {
    it('should return the appropratite results for the date', () => {
      const date = formatDate('2019-09-04 09:59:58.982+01');
      expect(date.day).toBe(4);
      expect(date.month).toBe('Sep');
      expect(date.year).toBe(2019);
      expect(date.minutes).toBe(59);
    });
  });
});
