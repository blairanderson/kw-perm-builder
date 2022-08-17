import * as React from "react";
import Footer from "./Footer";
import "./styles.css";

export default function App() {
  const [modifiers, update] = React.useState([
    ["cast iron"],
    ["floor"],
    ["vent", "register"],
    ["4x10", "4x12"]
  ]);

  const combos = Combos(modifiers);

  const keywordsCollect = {};

  combos.forEach((combination, index1) => {
    permutator(combination).forEach((c1) => {
      keywordsCollect[c1.join(" ")] = 1;
    });
  });

  const keywords = Object.keys(keywordsCollect);

  return (
    <div className="">
      <div className="App">
        <h1>{document.title}</h1>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-5">
            <p className="lead">Keyword List:</p>
            permutes:
            <RenderResult list={keywords} />
          </div>
          <div className="col">
            <p className="lead">Modifiers:</p>
            <InputForm modifiers={modifiers} update={update} />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

function InputForm({ modifiers, update }) {
  return (
    <ul className="list-group">
      {modifiers.map((value, index) => {
        const key = "input" + index;
        return (
          <li className="list-group-item" key={key}>
            <div className="input-group mb-3">
              <input
                className="form-control"
                type="text"
                value={value[0]}
                onChange={(e) => {
                  // get a copy
                  const newState = modifiers.slice(0);
                  // update the value
                  newState[index][0] = e.target.value;
                  update(newState);
                }}
                key={key}
              />
              {value.length > 1 ? (
                <>
                  <input
                    className="form-control"
                    type="text"
                    value={value[1]}
                    onChange={(e) => {
                      // get a copy
                      const newState = modifiers.slice(0);
                      // update the value
                      newState[index][1] = e.target.value;
                      update(newState);
                    }}
                  />
                  <button
                    className="btn btn-outline-warning"
                    type="button"
                    onClick={() => {
                      const newState = modifiers.slice(0);
                      newState[index] = [modifiers[index][0]];
                      update(newState);
                    }}
                  >
                    x
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    // get a copy
                    const newState = modifiers.slice(0);
                    // update the value
                    newState[index] = modifiers[index].concat("");
                    update(newState);
                  }}
                >
                  +
                </button>
              )}
              {value.length > 1 ? (
                ""
              ) : (
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={() => {
                    const newState = modifiers.slice(0);
                    newState.splice(index, 1);
                    update(newState);
                  }}
                >
                  x
                </button>
              )}
            </div>
          </li>
        );
      })}
      <li className="list-group-item d-grid">
        <button
          onClick={() => update(modifiers.concat([[""]]))}
          className="btn btn-outline-success btn-sm"
        >
          Add Modifier
        </button>
      </li>
    </ul>
  );
}

function RenderResult({ list }) {
  return (
    <>
      <textarea
        rows={list.length}
        className="form-control"
        readOnly={true}
        value={list.join("\n")}
        onClick={(e) => e.target.select()}
      />
    </>
  );
}


function Combos(list, n = 0, result = [], current = []) {
  if (n === list.length) {
    result.push(current);
  } else {
    list[n].forEach((item) => Combos(list, n + 1, result, [...current, item]));
  }

  return result;
}

function permutator(inputArr) {
  const result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
}