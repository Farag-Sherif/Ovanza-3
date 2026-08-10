import { createContext } from "react";
import PropTypes from "prop-types";
import { useSettingsQuery } from "../hooks/queries/useSettingsQuery";

export const DataContext = createContext({
  data: null,
  loading: true,
});

export const DataProvider = ({ children }) => {
  const { data, isLoading } = useSettingsQuery();

  return (
    <DataContext.Provider value={{ data: data || null, loading: isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node,
};
