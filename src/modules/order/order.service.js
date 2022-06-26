import prisma from '../../utils/prisma.js'

export const createOrder = async (input) => {
    try {
        const {orderUnits, ...orderFlat} = input
        const order = prisma.order.create({
            data: {
                ...orderFlat,
                orderUnits: {
                    create: [
                        ...orderUnits
                    ]
                }
            },
            include: {
                orderUnits: true
            }
            
        })
        return order
    } catch (e) {
        throw new Error("Ошибка при создании заказа")
    }

}

export const deleteOrder = async (orderId) => {
    // TODO: check if order not exist
    const order = await prisma.order.delete({
        where: {
            id: orderId
        }
    })
}


export const getOneOrder = async (orderId) => {
    return prisma.order.findUnique({
        where: {
            id: orderId
        }
    })
}

export const getOrders = async () => {
    return prisma.order.findMany({
        include: {
            Courier: true,
            orderUnits: true
        }
    })
}


export const assignCourier = async (orderId) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    })

    if (order.courierId != null) {
        throw new Error("Заказ уже назначен")
    }

    const allCouriers = await prisma.courier.findMany({
        include: {
            _count: {
                select: {
                    order: true
                }
            }
        },
        orderBy: {
            order: {
                _count: 'asc'
            }
        }
    })


    //TODO: refactor nested ifs
    if (order != null) {
        const availableCouriers = allCouriers.filter(el => el._count.order < 3)
        if (availableCouriers != null && availableCouriers.length > 0) {
            const availableCourier = availableCouriers[0]

            const updOrder = await prisma.order.update({
                where: {
                    id: orderId
                },
                data: {
                    Courier: {
                        connect: {
                            id: availableCourier.id
                        }
                    }
                },
                include: {
                    Courier: true
                }
            })

            return updOrder


        } else {
            throw new Error("Нет доступных курьеров") 
        }
    } else {
        throw new Error("Неправильный orderId")
    }

}

export const removeCourier = async (orderId) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    })

    if (order.courierId == null) {
        throw new Error("Заказу не назначен курьер")
    }

    if (order != null) {
        const updOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                Courier: {
                    disconnect: true
                }
            },
            include: {
                Courier: true
            }
        })

        return updOrder
    } else {
        throw new Error("Неправильный orderId")
    }

}

export const updateOrder = async (orderId, orderBody) => {
      // TODO: refadctor duplicate code
      const order = prisma.order.findUnique({
        where: {
            id: orderId
        }
    })

    if(order != null) {
       try {
            const updOrder = prisma.order.update({
            where: {
                id: orderId
            },
            data: orderBody
       }) 

          return updOrder

       } catch (e) {
         throw new Error("Ошибка при обновлении заказа") 
       }
           } else {
        throw new Error(`Нет заказа с id ${orderId}`)
    }
}
