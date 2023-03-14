// please rewrite this piece of code in typescript
export class QnA_Unit {
    constructor({question = null,answer = null, prefix = null, suffix = null, 
            question_author = null, answer_author = null,
            isPrivateQa = false}) {
        this.q = question;
        this.a = answer
        this.prefix = prefix // i.e. Remember to stay in character
        this.suffix = suffix
        this.qAuth = question_author // design note [question is just the last in context] actuall the question is just the last in the context?
        this.aAuth = answer_author
        this.private = isPrivateQa
        this.ts = null
    }
    
    static Record_To_Unit(record) {
        const unit = new QnA_Unit({})
        
            unit.q = record.question
            unit.a = record.answer

            unit.prefix = record.prefix
            unit.suffix = record.suffix
            unit.qAuth = record.qAuth
            unit.aAuth = record.aAuth
            unit.private = record.private
            unit.ts = record.ts

        return unit
    }

    static Record_From_Unit(unit,conversationId=null) {
        const record = {
            conversationId : conversationId
            , question: unit.q
            , answer: unit.a

            , prefix: unit.prefix
            , suffix: unit.suffix
            , qAuth: unit.qAuth
            , aAuth: unit.aAuth
            , private: unit.private
            , ts: unit.ts
        }
        return record
    }



    combined(insep) {
        insep = insep ?? '\n'
        let ingredients = []
        if (this.prefix) ingredients.push(this.prefix)
        if (this.q) ingredients.push(this.q)
        if (this.a) ingredients.push(this.a)
        if (this.suffix) ingredients.push(this.suffix)
        return ingredients.join(insep)
    }

    combined_Author(author, insep) {
        insep = insep ?? '\n'
        const youAreAuthor = (this.qAuth == author) 
        // if you are not the author hide your suffixes and prefixes
        let ingredients = []
        if (this.private && youAreAuthor) {
            return ''
        }

        if (youAreAuthor && this.prefix) ingredients.push(this.prefix)
        if (this.q) ingredients.push(this.q) // the question 'they' asked you, or there remark
        if (this.a) ingredients.push(this.a) // your answer or remark
        if (youAreAuthor && this.suffix) ingredients.push(this.suffix)
        return ingredients.join(insep)
    }
}


// see https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api
export class QnA_List {
    constructor(dfltPrefix, dfltSuffix, paragraphJoiner) {
        this.dfltPrefix = dfltPrefix ?? null
        this.dfltSuffix = dfltSuffix ?? null
        this.pJoiner = paragraphJoiner ?? '\n'
        this.lst = []
        this.lastError = null
        this.defaultOutersep = this.pJoiner
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

    combined_Author(author, outersep = null) {
        outersep = outersep ?? this.pJoiner
        let paragraphs = []
        for (let i = 0; i < this.lst.length; i++) {
            const u = this.lst[i]
            let paragraph = u.combined(author)
            paragraphs.push(paragraph)
        }
        return paragraphs.join(outersep)
    }

    // unitAt(i) {
    //     return this.lst[i]
    // }

    getUnits() {
        return this.lst
    }


    generateRecords(qnal) {
        let units = qnal.getUnits()
        if (units) {
            const records = units.map((unit, index)=>{ const record=QnA_Unit.Record_From_Unit(unit); return record} )
            return records
        } else {
            return null
        }

    }

    static createFromRecords(records) {
        

        let qnal = new QnA_List()
        if (! Array.isArray(records)) return qnal

        try {
        
            if (records.forEach === undefined) 
                return qnal

            
            records.forEach((record) => {
                let unit = QnA_Unit.Record_To_Unit(record) //new QnA_Unit({question : record.question, answer : record.answer})
                qnal.add(unit)

            

            });
            return qnal
        } catch(e) {
            return e.message;
        }
        
    }

    
}

