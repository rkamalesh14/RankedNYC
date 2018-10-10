import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getData, selectList } from '../store/user.js';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loader from './Loader.jsx';

const styles = theme => ({
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  menu: {
    width: 200,
  },
  button: {
    height: 50,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Search extends React.Component {
  state = {
    url: '',
    name: '',
    submitted: false,
    status: 'Scraping restaurant data...',
    list: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.getData(this.state.url, this.state.name);
    this.setState({
      submitted: true,
    });
    setTimeout(() => {
      this.setState({
        status: 'Generating location data...',
      });
    }, 7000);
    setTimeout(() => {
      this.setState({
        status: 'Populating map...',
      });
    }, 15000);
  };

  handleList = event => {
    event.preventDefault();
    if (this.state.list === 'all') {
      const name = 'All Lists';
      const data = this.props.lists.reduce((acc, el) => {
        return [...acc, ...el.data];
      }, []);
      console.log(data);
      this.props.selectList({ name, data });
    } else {
      const list = this.props.lists.find(el => el.name === this.state.list);
      this.props.selectList(list);
    }
  };
  render() {
    let { classes, lists } = this.props;
    lists = lists || [];
    return (
      <div>
        {!this.state.submitted ? (
          <div>
            <h3 className="header">New List</h3>
            <form
              onSubmit={this.handleSubmit}
              className={classes.container}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="url"
                name="url"
                label="Url: (Currently only supports The Infatuation articles)"
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required
              />
              <TextField
                id="name"
                name="name"
                label="Enter a nickname for your list:"
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required
              />
              <Button
                type="submit"
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={this.state.url === '' || this.state.name === ''}
              >
                Submit
              </Button>
            </form>
            <h3 className="header">Saved Lists</h3>
            <form onSubmit={this.handleList}>
              <TextField
                id="list"
                name="list"
                select
                label="Select"
                className={classes.textField}
                onChange={this.handleChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                value={this.state.list}
                helperText="Please select your list"
                margin="normal"
              >
                <MenuItem value="all">Display All</MenuItem>
                {lists.map(list => (
                  <MenuItem key={list.name} value={list.name}>
                    {list.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={this.state.list === ''}
              >
                Submit
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <Loader />
            <div id="loader">
              <h5>{this.state.status}</h5>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.user.lists,
});

const mapDispatchtoProps = dispatch => {
  return {
    getData: (url, name) => dispatch(getData(url, name)),
    selectList: list => dispatch(selectList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(
  withStyles(styles)(Search)
);
