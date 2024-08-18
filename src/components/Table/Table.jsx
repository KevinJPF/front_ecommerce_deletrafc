import styles from "./Table.module.css";
import React, { useState, useRef, useEffect } from "react";
import SearchSvg from "../../svg/SearchSvg";
import DropDownButton from "../Button/DropDownButton";

const Table = ({
  headers,
  data,
  handleRowClick,
  selectedItemLift,
  initialSelectedRow,
  showQuantity = true,
  canSelect = true,
  multiSelect = false,
}) => {
  const [rows, setRows] = useState([]);
  const [rowsData, setRowsData] = useState(data);
  const [initialRows, setInitialRows] = useState();
  const [selectedRow, setSelectedRow] = useState(
    Array.isArray(initialSelectedRow)
      ? initialSelectedRow
      : [initialSelectedRow]
  );
  const [selectedItem, setSelectedItem] = useState(
    Array.isArray(initialSelectedRow) && initialSelectedRow.length > 0
      ? initialSelectedRow.map((index) => data[index])
      : []
  );

  // console.log(selectedRow);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [indexToShowSearch, setIndexToShowSearch] = useState(null);
  const [searchText, setSearchText] = useState("");
  const inputRefs = useRef([]);

  const getNestedValue = (obj, key) => {
    return key.split(".").reduce((o, k) => {
      if (k.includes("[") && k.includes("]")) {
        const [prop, index] = k.split(/[\[\]]/).filter(Boolean);
        return o && o[prop] ? o[prop][Number(index)] : undefined;
      } else {
        return o ? o[k] : undefined;
      }
    }, obj);
  };

  const convertObjectsToRows = () => {
    const newRows = [];
    data.map((object) => {
      const newRow = [];
      for (let i = 0; i < headers.length; i++) {
        newRow.push(getNestedValue(object, headers[i].key));
      }
      newRows.push(newRow);
    });
    setRows(newRows);
    setInitialRows(newRows);
  };

  useEffect(() => {
    convertObjectsToRows();
    setRowsData(data);
  }, [data]);

  // Update the selected indexes list when list has size or order changed
  useEffect(() => {
    const newSelectedRows = selectedItem.map((item) => {
      // Find the same item index on the actual list
      const selectedIndexSorted = rowsData.findIndex(
        (row) => JSON.stringify(row) === JSON.stringify(item)
      );

      return selectedIndexSorted;
    });

    // setSelectedRow(newSelectedRows);
  }, [rowsData, selectedItem]);

  // Verifies if two objects is equals by their content
  const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  const handleFocus = (index) => {
    setTimeout(() => {
      inputRefs.current[index]?.focus();
    }, 0);
  };

  const naturalSort = (a, b) => {
    const extractNumbers = (str) => {
      const matches = str.match(/\d+/g);
      return matches ? matches.map(Number) : [];
    };

    const numbersA = extractNumbers(a);
    const numbersB = extractNumbers(b);

    if (numbersA.length === 0 && numbersB.length === 0) {
      // If both strings have no numbers, compare them lexicographically
      return a.localeCompare(b);
    }

    // If one string has no numbers, it should be considered smaller
    if (numbersA.length === 0) return -1;
    if (numbersB.length === 0) return 1;

    for (let i = 0; i < Math.max(numbersA.length, numbersB.length); i++) {
      const numA = numbersA[i] || 0;
      const numB = numbersB[i] || 0;
      if (numA !== numB) {
        return numA - numB;
      }
    }

    return a.localeCompare(b);
  };

  const orderByIndex = (index) => {
    let newDirection = "asc";
    if (sortConfig.key === index && sortConfig.direction === "asc") {
      newDirection = "desc";
    }

    const extractValue = (object) => getNestedValue(object, headers[index].key);

    // Order the rowsData object list
    const sortedRowsData = [...rowsData].sort((a, b) => {
      const valueA = extractValue(a);
      const valueB = extractValue(b);

      if (newDirection === "asc") {
        return naturalSort(valueA, valueB);
      } else {
        return naturalSort(valueB, valueA);
      }
    });

    // Convert sortedRowsData to the form of rows
    const sortedRows = sortedRowsData.map((object) => {
      const newRow = [];
      for (let i = 0; i < headers.length; i++) {
        newRow.push(getNestedValue(object, headers[i].key));
      }
      return newRow;
    });

    setSortConfig({ key: index, direction: newDirection });
    setRowsData(sortedRowsData);
    setRows(sortedRows);
  };

  const orderByText = (index, text) => {
    // if (indexToShowSearch === null) return;
    if (!Array.isArray(initialRows) || !Array.isArray(data)) return;

    if (text !== "") {
      const filteredRows = initialRows.filter((item) =>
        item[index] ? item[index].toUpperCase().includes(text) : false
      );
      const filteredData = data.filter((item) =>
        getNestedValue(item, headers[index].key)
          ? getNestedValue(item, headers[index].key)
              .toUpperCase()
              .includes(text)
          : false
      );

      setRows(filteredRows);
      setRowsData(filteredData);
    } else {
      setRows(initialRows);
      setRowsData(data);
      setSortConfig({ key: null, direction: "asc" });
    }
  };

  const selectDeselectAll = (index) => {
    const newRows = [...rows];
    const select = newRows.some((row) => row[index] === false);

    newRows.forEach((row) => {
      row[index] = select;
    });

    setRows(newRows);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  };

  const renderCellValue = (rowIndex, colIndex, value, handleContentClick) => {
    // Verifica se a coluna deve exibir um value
    if (headers[colIndex].type === "money") {
      return `R$ ${value}`;
    }
    // Verifica se a coluna deve exibir um checkbox
    if (headers[colIndex].type === "checkbox") {
      return value ? "✓" : "X";
    }
    // Verifica se a coluna deve exibir uma data
    if (headers[colIndex].type === "date") {
      return formatDate(value);
    }
    // Verifica se a coluna deve exibir um dropdown
    else if (headers[colIndex].type === "dropdown") {
      return (
        <DropDownButton
          options={headers[colIndex].dropdownItems}
          value={value}
          onChange={(newValue) => {
            const newRows = [...rows];
            newRows[rowIndex][colIndex] = newValue;
            setRows(newRows);
          }}
          onClick={(e) => {
            handleContentClick(e, rowIndex, colIndex);
          }}
        />
      );
    }
    return value;
  };

  const handleClick = (index) => {
    if (!canSelect) return;
    if (multiSelect) {
      setSelectedRow((prevSelectedRow) => {
        if (prevSelectedRow.includes(index)) {
          return prevSelectedRow.filter((i) => i !== index);
        } else {
          return [...prevSelectedRow, index];
        }
      });
      setSelectedItem((prevSelectedItem) => {
        if (prevSelectedItem[0] == null) {
          return [rowsData[index]];
        }
        const itemExists = prevSelectedItem.some((item) =>
          isEqual(item, rowsData[index])
        );
        if (itemExists) {
          return prevSelectedItem.filter(
            (item) => !isEqual(item, rowsData[index])
          );
        } else {
          return [...prevSelectedItem, rowsData[index]];
        }
      });
    } else {
      setSelectedRow((prevSelectedRow) =>
        prevSelectedRow.includes(index) ? [] : [index]
      );
      setSelectedItem((prevSelectedItem) => {
        const itemExists = prevSelectedItem.some((item) =>
          isEqual(item, rowsData[index])
        );
        if (itemExists) {
          return [];
        } else {
          return [rowsData[index]];
        }
      });
    }

    handleRowClick && handleRowClick(selectedItem, selectedRow);
  };

  useEffect(() => {
    selectedItemLift && selectedItemLift(selectedItem);
  }, [selectedItem]);

  const handleContentClick = (event, rowIndex, colIndex) => {
    event.stopPropagation();
  };

  const handleSearchButtonClick = (index) => {
    const newIndexToShowSearch = indexToShowSearch === index ? null : index;
    setIndexToShowSearch(newIndexToShowSearch);
    setSearchText("");
    if (newIndexToShowSearch === null) {
      orderByText(index, "");
    } else {
      inputRefs.current[index].value = "";
      handleFocus(index);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        console.log(indexToShowSearch);
        if (indexToShowSearch !== null) {
          orderByText(indexToShowSearch, "");
          setIndexToShowSearch(null);
          setSearchText("");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.table_container}>
        <table className={styles.table}>
          {/* Cabeçalho da tabela */}
          <thead className={styles.table_head}>
            <tr className={styles.tr_head}>
              {headers.map((header, index) => (
                <th
                  className={styles.th}
                  key={index}
                  // style={{ backgroundColor: index % 2 === 0 ? "blue" : "red" }}
                >
                  {/* Conteúdo do cabeçalho */}
                  <div
                    className={styles.header_container}
                    style={
                      index < headers.length - 1
                        ? {
                            borderRight: "2px solid var(--overlay4)",
                          }
                        : null
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        onClick={() => orderByIndex(index)}
                        style={{
                          width: "100%",
                          display:
                            index !== indexToShowSearch ? "block" : "none",
                        }}
                      >
                        {sortConfig.key === index &&
                          (sortConfig.direction === "asc" ? "▼ " : "▲ ")}
                        {header.title}
                      </div>
                      {/* Container de busca */}
                      {header.type !== "checkbox" && header.showSearch && (
                        <>
                          <div
                            key={index}
                            className={styles.search_container}
                            style={{
                              display:
                                index === indexToShowSearch ? "block" : "none",
                            }}
                          >
                            <input
                              type="text"
                              ref={(el) => (inputRefs.current[index] = el)}
                              value={searchText}
                              placeholder="Type to filter"
                              onChange={(e) => {
                                setSearchText(e.target.value);
                                orderByText(
                                  index,
                                  e.target.value.toUpperCase()
                                );
                              }}
                            />
                          </div>
                          {/* Botão de busca */}
                          <div
                            className={styles.search_button}
                            onClick={() => {
                              handleSearchButtonClick(index);
                            }}
                          >
                            {index !== indexToShowSearch ? (
                              <SearchSvg />
                            ) : (
                              <span>X</span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {/* Corpo da tabela */}
          <tbody className={styles.table_body}>
            {rows && rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={
                    selectedRow.includes(rowIndex)
                      ? styles.selected_tr
                      : styles.tr
                  }
                  onClick={() => handleClick(rowIndex)}
                >
                  {row.map((value, colIndex) => (
                    <td
                      className={styles.td}
                      key={colIndex}
                      style={
                        {
                          // backgroundColor: colIndex % 2 === 0 ? "green" : "orange",
                        }
                      }
                    >
                      <div
                        className={styles.cell_container}
                        style={
                          colIndex < row.length - 1
                            ? {
                                borderRight: "2px solid var(--background)",
                              }
                            : null
                        }
                      >
                        {renderCellValue(
                          rowIndex,
                          colIndex,
                          value,
                          handleContentClick
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <div className={styles.warning_container}>
                    Não há nenhum item na lista ainda.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showQuantity && (
        <div className={styles.quantity_container}>
          <p>{rows.length} resultados</p>
        </div>
      )}
    </div>
  );
};

export default Table;
