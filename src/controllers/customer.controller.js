const Customer = require("../schemas/Customer")

const getCustomers = async (req, res) => {
    try {
const {search,limit}= req.query
const regex = new RegExp(search, `i`)
console.log(regex)
        const customers = await (await Customer.find({$or:[{name: regex},{email: regex},{company: regex}]
        }))
        return res.status(200).json({
            ok: true,
            message: "",
            customers,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error en el servidor"
        })

    }
}

const createCustomer = async (req, res) =>{
    try {
        console.log(req.body);   
        const {name, email, company, phone} = req.body

        const newCustomer = new Customer({name, email, company, phone})

        const customerSaved = await newCustomer.save()

        return res.status(200).json({
            ok: true,
            message: "Cliente creado",
            customer: customerSaved
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error en el servidor"
        })
    }
}

const updateCustomer = async (req, res) => {
    try {  
        const {id, name, email, company, phone} = req.body

        const userExist = await Customer.exists({_id: id})

        if (!userExist) return res.status(404).json({
            ok: false,
            message: "El cliente no existe"
        })

        const customerUpdate = await Customer.findByIdAndUpdate(
            id, {
                $set: { name, email, company, phone},
        }, {new: true})

        return res.status(200).json({
            ok: true,
            message: "Cliente actualizado",
            product: null
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error en el servidor"
       
        })
    }
}

const deleteCustomer = async (req, res) => {
    try {  
        const { id } = req.body

        const userExist = await Customer.exists({_id: id})

        if (!userExist) return res.status(500).json({
            ok: false,
            message: "El cliente no existe"
        })

        const customerDeleted = await Customer.deleteOne({ _id: id})

        return res.status(404).json({
            ok: true,
            message: "Cliente eliminado",
            customer: {_id: id, ...customerDeleted}
        })

    } catch (error) 
    {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error en el servidor"
        })
    }
}

module.exports = {getCustomers,createCustomer, updateCustomer,deleteCustomer}