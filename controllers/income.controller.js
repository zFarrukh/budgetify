const addIncome = (req, res) => {
    const { title, amount, date } = req.body;
    if(!title || !amount ) return res.json({error: "Please provide infromation"});
    //  totalAmount + amount

    res.json({message: "POST Income"})
}

const deleteIncomeById = (req, res) => {
    const id = req.params.id;
    //  totalAmount - amount
    res.json({message: "DELETE Income by id"})
}

const updateIncomeById = (req, res) => {
    const id = req.params.id;
    res.json({message: "PUT Incomes"});
 //  totalAmount - oldAmount + newAmount
}

const getIncomes = (req, res) => {
    
    
    res.json({message: "GET Incomes"});
}

module.exports = {
    addIncome,
    deleteIncomeById,
    updateIncomeById,
    getIncomes
}