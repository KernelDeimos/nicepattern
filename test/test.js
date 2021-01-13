var expect = require('chai').expect;
const { Sequence } = require('../src/Sequence');

var step = v => ({ name: v, fn: l => { l.push(v); return l; } });
var steps = (...l) => l.map(v => step(v));

describe('Sequence', () => {
  describe('remove()', () => {
    it('should remove a value in the middle', () => {
      var seq = new Sequence(steps('A','B','C'))
      seq.remove('B');
      expect(seq([])).eql(['A','C']);
    });
    it('should remove a value at the start', () => {
      var seq = new Sequence(steps('A','B','C'))
      seq.remove('A');
      expect(seq([])).eql(['B','C']);
    });
    it('should remove a value at the end', () => {
      var seq = new Sequence(steps('A','B','C'))
      seq.remove('C');
      expect(seq([])).eql(['A','B']);
    });
  });
  describe('clone()', () => {
    it('should not introduce unexpected mutations', () => {
      var seq1 = new Sequence(steps('A','B','C'))
      seq2 = seq1.clone()
      expect(seq1([])).eql(['A','B','C']);
      seq2.insertAfter('C', step('D'));
      expect(seq1([])).eql(['A','B','C']);
      expect(seq2([])).eql(['A','B','C','D']);
      seq2.remove('A');
      expect(seq1([])).eql(['A','B','C']);
      expect(seq2([])).eql(['B','C','D']);
      seq1.remove('B');
      expect(seq1([])).eql(['A','C']);
      expect(seq2([])).eql(['B','C','D']);
    });
  });
  describe('insertAfter()', () => {
    it('should work here', () => {
      var seq = new Sequence(steps('A','B','C'))
      seq.insertAfter('A', step('X'));
      expect(seq([])).eql(['A','X','B','C']);
    });
    it('should work there', () => {
      var seq = new Sequence(steps('A','B','C'))
      seq.insertAfter('C', step('X'));
      expect(seq([])).eql(['A','B','C','X']);
    });
  });
  describe('insertAfter()', () => {
    it('should work here', () => {
      var seq = new Sequence(steps('A','B','C'))
      seq.insertBefore('A', step('X'));
      expect(seq([])).eql(['X','A','B','C']);
    });
    it('should work there', () => {
      var seq = new Sequence(steps('A','B','C'))
      seq.insertBefore('C', step('X'));
      expect(seq([])).eql(['A','B','X','C']);
    });
  });
  describe('replace()', () => {
    it('should replace', () => {
      var seq = new Sequence(steps('A','B','C'))
      seq.replace('A', step('Y').fn);
      expect(seq([])).eql(['Y','B','C']);
      expect(seq.chain[0].name).equal('A');
    });
  });
});
