Cypress.Commands.add('templateGet', (obj, is_paginate) => {
    let dataType

    // Builder
    if(is_paginate){
        dataType = 'object'
    } else {
        dataType = 'array'
    }

    // Test
    expect(obj.status).to.equal(200)
    expect(obj.body.message).to.be.a('string')

    if(is_paginate == false){
        expect(obj.body.data).to.be.a(dataType)
    }

    if(is_paginate == true){
        expect(obj.body.data.data).to.be.a('array')
    }
});

Cypress.Commands.add('templatePost', (obj, builder) => {
    // Test
    expect(obj.status).to.equal(200)
    expect(obj.body.message).to.be.a('string')
    
    if(builder){
        Object.entries(builder).forEach(([key, value]) => {
            expect(obj.body.data[key]).to.eq(value)
        });
    }

    expect(obj.body.data).to.have.property('id')
    expect(obj.body.data).to.have.property('created_at')
    expect(typeof obj.body.data.id).to.eq('string')
    expect(typeof obj.body.data.created_at).to.eq('string')
});

Cypress.Commands.add('templateDelete', (obj) => {
    // Test
    expect(obj.status).to.equal(200)
    expect(obj.body.message).to.be.a('string')
});

Cypress.Commands.add('templatePut', (obj) => {
    // Test
    expect(obj.status).to.equal(200)
    expect(obj.body.message).to.be.a('string')

    expect(obj.body).to.have.property('rows_affected')
    expect(typeof obj.body.rows_affected).to.eq('number')
});

Cypress.Commands.add('templatePagination', (url, max) => {
    for (let index = 1; index <= max; index++) {
        cy.request({
            method: 'GET', 
            url: url + '?page='+index,
        }).then(dt => {
            expect(dt.status).to.equal(200)
        })
    }
});

Cypress.Commands.add('templateValidateColumn', (data, obj, dataType, nullable) => {
    const dataArray = Array.isArray(data) ? data : [data];

    dataArray.forEach((item) => {
        expect(item).to.be.an('object')
        obj.forEach((field) => {
            expect(item).to.have.property(field)
            if (nullable && item[field] === null) {
                expect(item[field]).to.be.null
            } else {
                expect(item[field]).to.be.a(dataType)

                if(dataType === "number"){
                    if(Number.isInteger(item[field])){
                        expect(item[field] % 1).to.equal(0)
                    } else {
                        expect(item[field] % 1).to.not.equal(0)
                    }
                }
            }
        });
    });
});

Cypress.Commands.add('templateValidateContain', (data, list, target) => {
    data.forEach((item, idx) => {
        expect(item).to.be.an('object')
        expect(list,`Column ${target} with value = ${item[target]} must contain in list. Index Data : ${idx}`).to.include(item[target])
    });
});

Cypress.Commands.add('templateOrdering', (data, target, typeOrdering, typeData) => {
    data.forEach((item,idx)=> {
        expect(item).to.be.an('object')

        if(idx < data.length - 1){
            if(typeData == 'number'){
                const current_value = parseInt(item[target]) 
                const next_value = parseInt(data[idx+1][target])

                if(typeOrdering == 'ascending'){
                    expect(next_value, 
                        `Column ${target} with current value (Idx : ${idx}) = ${current_value} must be lower than or equal to next value (Idx : ${idx+1}) = ${next_value}`
                        ).to.be.least(current_value)
                } else if(typeOrdering == 'descending'){
                    expect(next_value,
                        `Column ${target} with current value (Idx : ${idx}) = ${current_value} must be greater than or equal to next value (Idx : ${idx+1}) = ${next_value}`
                        ).to.be.most(current_value)
                }
            } 
        }
    })
})