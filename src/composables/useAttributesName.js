
export default function useAttributesName() {
  const attributes_names = useState('attributes_names', () => [])

  function updateAttributesNames(newNames) {
    attributes_names.value = newNames
  }

  return {
    attributes_names,
    updateAttributesNames
  }
}