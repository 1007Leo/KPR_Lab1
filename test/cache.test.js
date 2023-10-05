import {Cache} from "../src/cache";

describe('add()', () => {

    test('add() should add new record', () => {
        let cache = new Cache();
        cache.add('Name1', 'value1', 2);
        expect(cache.get('Name1')).toBe('value1');
    });

    test('add() should add new record with 1 hit if no such value given', () => {
        let cache = new Cache();
        cache.add('Name1', 'value1');
        expect(cache.getHits('Name1')).toBe(1);
    });
});

describe('getHits()', () => {

    test('getHits() should return record hits', () => {
        let cache = new Cache();
        cache.add('Name1', 'value1', 2);
        expect(cache.getHits('Name1')).toBe(2);
    });

    test('getHits() should return null if no such record exists', () => {
        let cache = new Cache();
        expect(cache.getHits('Name1')).toBe(null);
    });
});

describe('get()', () => {

    test('get() should return value by key', () => {
        let cache = new Cache();
        cache.add('Name1', 'value1', 2);
        expect(cache.get('Name1')).toBe('value1');
    });

    test('get() should decrease amount of hits by 1', () => {
        let cache = new Cache();
        cache.add('Name1', 'value1', 2);
        cache.get('Name1');
        expect(cache.getHits('Name1')).toBe(1);
    });

    test('get() should return null if hits == 0', () => {
        let cache = new Cache();
        cache.add('Name1', 'value1', 0);
        expect(cache.get('Name1')).toBe(null);
    });

    test('get() should return null if no such record exists', () => {
        let cache = new Cache();
        expect(cache.get('Name1')).toBe(null);
    });
});

describe('history()', () => {

    test('history() should log access to nonexisting record', () => {
        let cache = new Cache();
        cache.get('Name');
        const res = 'Accessed nonexisting record: Name\n';
        expect(cache.history()).toBe(res);
    });

    test('history() should log access to record with 0 hits', () => {
        let cache = new Cache();
        cache.add('Name', 'Value', 0);
        cache.get('Name');
        const res = 'Added record: Name, Value, 0\nAccessed record with 0 hits: Name, Value, 0\n';
        expect(cache.history()).toBe(res);
    });

    test('history() should log access to record', () => {
        let cache = new Cache();
        cache.add('Name', 'Value', 2);
        cache.get('Name');
        const res = 'Added record: Name, Value, 2\nAccessed record: Name, Value, 2\n';
        expect(cache.history()).toBe(res);
    });

    test('history() should log newely added records', () => {
        let cache = new Cache();
        cache.add('Name', 'Value', 2);
        const res = 'Added record: Name, Value, 2\n';
        expect(cache.history()).toBe(res);
    });
});
