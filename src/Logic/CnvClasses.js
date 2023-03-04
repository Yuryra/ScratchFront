// please rewrite this piece of code in typescript
export class QnA_Unit {
    constructor({question = null,answer = null, prefix = null, suffix = null, 
            question_author = null, answer_author = null}) {
        this.q = question;
        this.a = answer
        this.prefix = prefix
        this.suffix = suffix
        this.qAuth = question_author // design note [question is just the last in context] actuall the question is just the last in the context?
        this.aAuth = answer_author
    }

    combined(sep) {
        sep = sep ?? '\n'
        let ingredients = []
        if (this.prefix) ingredients.push(this.prefix)
        if (this.q) ingredients.push(this.q)
        if (this.a) ingredients.push(this.a)
        if (this.suffix) ingredients.push(this.suffix)
        return ingredients.join(sep)
    }
}

export class QnA_List {
    constructor(dfltPrefix, dfltSuffix, paragraphJoiner) {
        this.dfltPrefix = dfltPrefix ?? null
        this.dfltSuffix = dfltSuffix ?? null
        this.pJoiner = paragraphJoiner ?? '\n'
        this.lst = []
        this.lastError = null
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

    // unitAt(i) {
    //     return this.lst[i]
    // }

    getUnits() {
        return this.lst
    }

    static createFromRecords(records) {
        let lst = new QnA_List()
        try {
        
            if (records.forEach === undefined) 
                return lst

            
            records.forEach((record) => {
                let unit = new QnA_Unit({question : record.question, answer : record.answer})
                lst.add(unit)

            

            });
            return lst
        } catch(e) {
            return e.message;
        }
        
    }
}

