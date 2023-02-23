// please rewrite this piece of code in typescript
class QnA_Unit {
    constructor({question = null,answer = null, prefix = null, suffix = null}) {
        this.q = question;
        this.a = answer
        this.prefix = prefix
        this.suffix = suffix
    }

    combined(sep) {
        sep = sep ?? '\n'
        let ingredients = []
        if (this.prefix) ingredients.push(this.prefix)
        if (this.q) ingredients.push(this.q)
        if (this.a) ingredients.push(this.a)
        if (this.prefix) ingredients.push(this.prefix)
        return ingredients.join(sep)
    }
}

export class QnA_List {
    constructor(dfltPrefix, dfltSuffix, paragraphJoiner) {
        this.dfltPrefix = dfltPrefix ?? null
        this.dfltSuffix = dfltSuffix ?? null
        this.pJoiner = paragraphJoiner ?? '\n'
        this.lst = []
    }

    add(unit) {
        this.lst = [...this.lst, unit]
        return 'ss'
    }

    combined(lsep) {
        lsep = lsep ?? this.pJoiner
        let paragraphs = []
        for (let i = 0; i < this.lst.length; i++) {
            const u = this.lst[i]
            let paragraph = u.combined()
            paragraphs.push(paragraph)
        }
        return paragraphs.join(lsep)
    }

    static createFromRecords(records) {
        let lst = new QnA_List()
        records.forEach((record) => {
            let unit = new QnA_Unit({question : record.q, answer : record.a})
            lst.add(unit)

        });
        return lst
    }
}

