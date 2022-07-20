import { Component } from 'react';
import './App.css';
import AppFilter from './components/app-filter/app-filter';
import AppInfo from './components/app-info/app-info';
import EmployersAddForm from './components/employers-add-form/employers-add-form';
import EmployersList from './components/employers-list/employers-list';
import SearchPanel from './components/search-panel/search-panel';


class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    data:[
      {name: "Jony", salary: 500,  increase: false, rice: true, id:1 },
      {name: "Mary", salary: 1000, increase: true,  rice: false, id:2 },
      {name: "Kate", salary: 5800, increase: false, rice: false, id:3 }
    ],
    term: '', 
    filter: 'rice'
  }
  this.maxId = 4;
}


  deleteItem = (id) => {
    this.setState(({data})=> {
      return {
          data: data.filter(item => item.id !== id)
      }
    })
  }


  // Да, пока могут добавляться пустые пользователи. Мы это еще исправим
  addItem = (name, salary) => {
    const newItem = {
        name, 
        salary,
        increase: false,
        rice: false,
        id: this.maxId++
    }
    this.setState(({data}) => {
        const newArr = [...data, newItem];
        return {
            data: newArr
        }
    });
}
  
  onToggleIncrease = (id) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id){
          return{...item, increase: !item.increase}
        }
        return item;
      })
    }))
  }

  onToggleRice = (id) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id){
          return{...item, rice: !item.rice}
        }
        return item;
      })
    }))
  }

  searchEmp = (items, term) => {
    if(term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSeacrh = (term)=> {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rice':
        return items.filter(item => item.rice);
        case 'moreThen1000':
          return items.filter(item => item.salary > 1000);
          default:
            return items
    }
  }
  
onFilterSelect = (filter) => {
  this.setState({filter});
}

  render() {
    const {data,term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="App">
          <AppInfo employees={employees} increased={increased}/>  
  
          <div className="search-panel">
            <SearchPanel onUpdateSeacrh={this.onUpdateSeacrh}/>
            <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div>
  
          <EmployersList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleIncrease={this.onToggleIncrease}
                onToggleRice={this.onToggleRice}/>
          <EmployersAddForm onAdd={this.addItem}/>
  
      </div>
    );
  }
}

export default App;
