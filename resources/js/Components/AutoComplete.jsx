import { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import TextInput from "./TextInput";

const Autocomplete = ({ value, onChange, onSelect }) => {
  const [query, setQuery] = useState(value || ""); // Initialize query with value
  const [suggestions, setSuggestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(""); // New state to store selected customer ID

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = debounce(async () => {
      setIsFetching(true);
      try {
        const response = await axios.get("/api/customers/search", {
          params: { query },
        });
        setSuggestions(response.data.customers);
      } catch (error) {
        console.error("Error fetching customer suggestions:", error);
      } finally {
        setIsFetching(false);
      }
    }, 300);

    fetchSuggestions();
  }, [query]);


  const handleSelect = (customer) => {
    setQuery(customer.name); // Set the query to the selected customer's name
    setSelectedCustomerId(customer.id); // Set the selected customer ID
    setSuggestions([]); // Clear suggestions

    if (onSelect) {
      onSelect(customer); // Optional callback to handle selection
    }
  };

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <TextInput
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full mt-1"
        placeholder="Type to search..."
      />
      
      {/* Hidden input field for customer_id */}
      <input
        type="hidden"
        name="customer_id"
        value={selectedCustomerId} // Bind selected customer ID to this hidden field
      />

      {isFetching && <div>Loading...</div>}
      {filteredSuggestions.length > 0 && (
        <ul className="absolute left-0 right-0 z-10 mt-1 overflow-y-auto bg-white border rounded-md max-h-40">
          {filteredSuggestions.map((customer) => (
            <li
              key={customer.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(customer)}
            >
              {customer.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
