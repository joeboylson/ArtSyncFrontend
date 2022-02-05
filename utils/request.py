def serialize_value(value):

  if (str(type(value))).startswith("<class 'datastore."):
    return value.to_dict()

  if str(type(value)) == "<class 'sqlalchemy.util._collections.result'>":
    return [serialize_value(_value) for _value in value]

  return value


def serialize_array(data_array):

  print("data array", data_array)

  if data_array is not None:
    return [serialize_value(i) for i in data_array]