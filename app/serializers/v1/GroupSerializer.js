var models = require("../../models")
  , Serializer = models.Serializer
  , UserSerializer = models.UserSerializer

exports.addSerializer = function() {
  return new Serializer('groups', {
    select: ['id', 'username', 'type', 'screenName', 'isPrivate', 'administratorIds']
  })
}
