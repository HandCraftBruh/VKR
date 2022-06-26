export const createOrderBody = {
  type: "object",
  properties: {
    title: { type: "string" },
    courierId: { type: "string" },
    orderUnits: {
      type: "array",
      items: { 
        type: "object", 
        properties: {
            title: {type: "string"},
            amount: {type: "integer"}
        },
    } 
    }
  },
  required: ["title"],
  additionalProperties: false,
};

export const updateOrderBody = {
  type: "object",
  properties: {
    title: { type: "string" },
    courierId: { type: "string" },
    orderUnits: { type: "array", items: { type: "string" } },
  },
  required: ["title"],
  additionalProperties: false,
};

export const updateOrderParams = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

export const deleteOrderParams = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

export const getOneParams = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

export const assignCourierParams = {
  type: "object",
  properties: {
    orderId: { type: "string" },
  },
  required: ["orderId"],
  additionalProperties: false,
};

export const removeCourierParams = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};
