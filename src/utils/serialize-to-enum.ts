export function isMemberOfEnum<
  TEnum extends string,
  TEnumValue extends number | string,
>(
  enumType: { [key in TEnum]: TEnumValue },
  value: number | string,
): value is TEnumValue {
  return Object.values(enumType).find((e) => e === value) !== undefined
}

export default function serializeToEnum<
  TEnum extends string,
  TEnumValue extends number | string,
>(
  enumType: { [key in TEnum]: TEnumValue },
  value: number | string,
): TEnumValue {
  const isTEnumMember = isMemberOfEnum(enumType, value)

  if (isTEnumMember) return value
  else
    throw Error(`The argument ${value} is not a member of the enum ${enumType}`)
}
