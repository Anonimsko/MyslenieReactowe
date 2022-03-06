import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import gra from './gra.jpg';

class ProductCategoryRow extends React.Component
{
  render() 
  {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component 
{
  render() 
  {
    const product = this.props.product;

    return (
      <tr>
          <td>{product.stocked}</td>
          <td>{product.name}</td>
          <td><img src={gra} alt="gra" /></td>
      </tr>
    );
  }
}

class ProductTable extends React.Component 
{
  render() 
  {
    const filterText = this.props.filterText;

    const rows = [];
    let lastCategory = null;
    
    this.props.products.forEach((product) => 
    {
      if (product.name.indexOf(filterText) === -1) 
      {
        return;
      }
      if (product.category !== lastCategory) 
      {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Kalendarz premier i dodruków</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) 
  {
    this.props.onFilterTextChange(e.target.value);
  }

  render() 
  {
    const filterText = this.props.filterText;
    return (
      <form>
        <input type="text" placeholder="Szukaj..." value={filterText} onChange={this.handleFilterTextChange} />
      </form>
    );
  }
}

class FilterableProductTable extends React.Component 
{
    constructor(props) 
    {
      super(props);
      this.state = 
      {
        filterText: ''
      };

      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(filterText) {
      this.setState({
        filterText: filterText
      });
    }

    render() 
    {
      return (
        <div>
          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
          <ProductTable
            products={this.props.products}
            filterText={this.state.filterText}
          />
        </div>
      );
    }
}


const PRODUCTS = [
  {category: 'Styczeń', stocked: "Premiera", name: 'Ratcatcher'},
  {category: 'Styczeń', stocked: "Dodruk", name: 'Rollo'},
  {category: 'Luty', stocked: "Premiera", name: 'Bór'},
  {category: 'Luty', stocked: "Premiera", name: 'Podwieczorek'},
  {category: 'Marzec', stocked: "Dodruk", name: 'Sushi Go!'},
  {category: 'Marzec', stocked: "Premiera", name: 'Rising Sun'},
  {category: 'Kwiecień', stocked: "Premiera", name: 'The Game'},
  {category: 'Kwiecień', stocked: "Premiera", name: 'IKI'},
  {category: 'Maj', stocked: "Premiera", name: 'Koty'},
  {category: 'Maj', stocked: "Dodruk", name: 'Dinokalipsa'},
  {category: 'Czerwiec', stocked: "Premiera", name: 'War Chest'},
  {category: 'Czerwiec', stocked: "Dodruk", name: 'Dobry Rok'},
  {category: 'Lipiec', stocked: "Dodruk", name: 'Wyspy Tukana'},
  {category: 'Lipiec', stocked: "Premiera", name: 'Pluszowe Opowieści'},
  {category: 'Sierpień', stocked: "Premiera", name: 'Dog Lover'},
  {category: 'Sierpień', stocked: "Dodruk", name: 'Uśpieni Bogowie'},
  {category: 'Wrzesień', stocked: "Premiera", name: 'Divinus'},
  {category: 'Wrzesień', stocked: "Premiera", name: 'Skytear Horde'},
  {category: 'Październik', stocked: "Dodruk", name: 'Total Domination'},
  {category: 'Październik', stocked: "Premiera", name: 'Flamecraft'},
  {category: 'Listopad', stocked: "Premiera", name: 'Frostheaven'},
  {category: 'Listopad', stocked: "Premiera", name: 'Pory Roku'},
  {category: 'Grudzień', stocked: "Dodruk", name: 'Jajko Kolumba'},
  {category: 'Grudzień', stocked: "Dodruk", name: 'Botanik'}
];
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);

reportWebVitals();
