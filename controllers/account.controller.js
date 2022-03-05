const getAllAccounts = (req, res) => {
    res.json({message: "GET account"});
}


const addAccount = (req, res) => {
    res.json({message: "POST account"})
}

const deleteAccountById = (req, res) => {
    const id = req.params.id;
   
    res.json({message: "DELETE account"});
}

const updateAccountById = (req, res) => {
    const id = req.params.id;

    

    res.json({message: "PUT account"});
}

module.exports = {
    getAllAccounts,
    addAccount,
    deleteAccountById,
    updateAccountById
}
