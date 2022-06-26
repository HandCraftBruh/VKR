import {
  assignCourierHandler,
  createOrderHandler,
  getOneOrderHandler,
  getOrdersHandler,
  removeCourierHandler,
  deleteOrderHandler,
  updateOrderHandler,
} from "./order.controller.js";

import {
  assignCourierParams,
  createOrderBody,
  getOneParams,
  removeCourierParams,
  deleteOrderParams,
  updateOrderParams,
  updateOrderBody,
} from "./order.shcema.js";

const orderRoutes = async (server) => {
  const orderRoutesTags = ["orders"];
  // create post
  server.post("/", {
    schema: {
      body: createOrderBody,
      tags: orderRoutesTags,
      response: {
        200: {
            type: "string"
        },
        400: {
          type: "string",
        },
      },
    },
    handler: createOrderHandler,
  });

  // TODO: update post
  server.put("/:id", {
    schema: {
      params: updateOrderParams,
      body: updateOrderBody,
      tags: orderRoutesTags,
      response: {
        200: {
          type: "string",
        },
        400: {
          type: "string",
        },
      },
    },
    handler: updateOrderHandler,
  });

  // delete post
  server.delete("/:id", {
    schema: {
      params: deleteOrderParams,
      tags: orderRoutesTags,
      response: {
        200: {
            type: "string"
        },
        400: {
          type: "string",
        },
      },
    },
    handler: deleteOrderHandler,
  });

  // get order by id
  server.get("/:id", {
    schema: {
      params: getOneParams,
      tags: orderRoutesTags,
      response: {
        200: {
          type: "string",
        },
        400: {
          type: "object",
          properties: {
            error: {type: "string"}
          }
        },
      },
    },
    handler: getOneOrderHandler,
  });

  // get all orders
  server.get("/", {
    handler: getOrdersHandler,
    schema: { tags: orderRoutesTags },
  });

  // assign courier
  server.post("/:id/assignCourier", {
    schema: {
      params: assignCourierParams,
      tags: orderRoutesTags,
      response: {
        200: {
          type: "string",
        },
        400: {
          type: "string",
        },
      },
    },
    handler: assignCourierHandler,
  });

  // remove courier
  server.post("/:id/removeCourier", {
    schema: {
      params: removeCourierParams,
      tags: orderRoutesTags,
      response: {
        200: {
          type: "string",
        },
        400: {
          type: "string",
        },
      },
    },
    handler: removeCourierHandler,
  });
};

// TODO: get orders for client, by phone number
// ВМЕСТО ??? придумать название для пути, например ordersForCustomer
// server.get("/???/:phoneNumber"),{
//     schema: {
            // params: getOrdersForClientParams,
            // tags: orderRoutesTags,
    //         // response: {
                //     200: {
                //       type: "string",
                //     },
                //     400: {
                //       type: "string",
                //     },
                //   },
        // },
//      handler: getOrdersForClientHandler 
// }
// }

export default orderRoutes;
