class Cache{
    constructor()
    {
        this.values = new Map();
        this.hits = new Map();
        this.log = [];
    }

    add(key, value, hits = 1)
    {
        this.values.set(key, value);
        this.hits.set(key, hits);

        this.log.push('Added record: ' + String(key) + ', ' + String(value) + ', ' + String(hits) + '\n');
    }
    get(key)
    {
        if (!this.values.has(key))
        {
            this.log.push('Accessed nonexisting record: ' + String(key) + '\n');
            return null;
        }
        if (this.hits.get(key) === 0)
        {
            this.log.push('Accessed record with 0 hits: ' + String(key) + ', ' + String(this.values.get(key)) + ', ' + String(this.hits.get(key)) + '\n');    
            return null;
        }

        this.log.push('Accessed record: ' + String(key) + ', ' + String(this.values.get(key)) + ', ' + String(this.hits.get(key)) + '\n');
        this.hits.set(key, this.hits.get(key) - 1);
        return this.values.get(key);
    }
    getHits(key)
    {
        if (!this.hits.has(key))
            return null;
        return this.hits.get(key);
    }
    history()
    {
        let res = '';
        for (let i = 0; i < this.log.length; i++)
        {
            res += this.log[i];
        }
        return res;
    }
}
export {Cache}