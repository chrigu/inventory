import { ref, computed } from "vue";

const items = ref([])
const searchTerm = ref('')

export default function() {

  const setItems = (newItems: any) => {
    items.value = newItems;
  }

  const setSearchTerm = (term: string) => {
    searchTerm.value = term;
  }

  const filteredItems = computed(() => {
    if (searchTerm.value === '') { 
      return items.value
    }
    
    return items.value.filter((item: any) => item.name.indexOf(searchTerm.value) === 0)
  });

  const hasItems = computed(() => filteredItems.value.length > 0)


  return {
    setItems,
    setSearchTerm,
    filteredItems,
    hasItems
  }
}
