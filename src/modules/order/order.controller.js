import { assignCourier, createOrder, getOneOrder, getOrders, removeCourier, deleteOrder, updateOrder } from "./order.service.js"

export const createOrderHandler = async (req, resp) => {
    const orderInput = req.body
    console.log(orderInput)
    try {
        const order = await createOrder(orderInput)
        return order
    } catch (e) {
        console.error(e.message)
        resp.code(400).send({
            error: e.message
        })
    }
}

export const updateOrderHandler = async (req, resp) => {
    const { id } = req.params
    const orderBody = req.body
    try {
        const updOrder = await updateOrder(id, orderBody)
        return updOrder
    } catch (e) {
         resp.code(400).send({
            error: e.message
        })
    
    }
}

export const deleteOrderHandler = async (req, resp) => {
    //TODO: add try catch
    const { id } = req.params
    return deleteOrder(id)
}

export const getOneOrderHandler = async (req, resp) => {
    //TODO: think about try catch; is it reasonable to return null if order is not found, or should return 404
    const { id } = req.params
    return getOneOrder(id)
}

export const getOrdersHandler = async (req, resp) => {
    return getOrders()
}

export const assignCourierHandler = async (req, resp) => {
    const { orderId } = req.params

    try {
        const updOrder = await assignCourier(orderId)
        return updOrder
    } catch (e) {
        resp.code(400).send({
            error: e.message
        })

    }
}

export const removeCourierHandler = async (req, resp) => {
    const { id } = req.params

    try {
        const updOrder = await removeCourier(id)
        return updOrder
    } catch (e) {
        resp.code(400).send({
            error: e.message
        })
    }
}

