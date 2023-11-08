const ORDER_CREATE_SUBSCRIPTION_KEY =
  'myconnector-orderCreatedSubscription';

export async function createOrderSubscription(
  apiRoot,
  topicName,
  projectId
) {
  const {
    body: { results: subscriptions },
  } = await apiRoot
    .subscriptions()
    .get({
      queryArgs: {
        where: `key = "${ORDER_CREATE_SUBSCRIPTION_KEY}"`,
      },
    })
    .execute();

  if (subscriptions.length > 0) {
    const subscription = subscriptions[0];

    await apiRoot
      .subscriptions()
      .withKey({ key: ORDER_CREATE_SUBSCRIPTION_KEY })
      .delete({
        queryArgs: {
          version: subscription.version,
        },
      })
      .execute();
  }

  await apiRoot
    .subscriptions()
    .post({
      body: {
        key: ORDER_CREATE_SUBSCRIPTION_KEY,
        destination: {
          type: 'GoogleCloudPubSub',
          topic: topicName,
          projectId,
        },
        messages: [
          {
            resourceTypeId: 'order',
            types: ['OrderCreated'],
          },
        ],
      },
    })
    .execute();
}

export async function deleteOrderSubscription(apiRoot) {
  const {
    body: { results: subscriptions },
  } = await apiRoot
    .subscriptions()
    .get({
      queryArgs: {
        where: `key = "${ORDER_CREATE_SUBSCRIPTION_KEY}"`,
      },
    })
    .execute();

  if (subscriptions.length > 0) {
    const subscription = subscriptions[0];

    await apiRoot
      .subscriptions()
      .withKey({ key: ORDER_CREATE_SUBSCRIPTION_KEY })
      .delete({
        queryArgs: {
          version: subscription.version,
        },
      })
      .execute();
  }
}
