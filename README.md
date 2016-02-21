# geo2country
From the coordinates of any location in the world, get approximately which country the location belongs to.

# Libary

```javascript
geo2country.load( (countries)=>{
  console.log(countries.countryName([10.05, 49.84]))
})
```

# Sample HTTP service

```bash
npm start
```

# Manage maps

Check available and in-use maps
```bash
npm run deploy-map ls
```

Install an available map
```bash
npm run deploy-map install $map_name
```

Remove an installed map
```bash
npm run deploy-map remove $map_name
```

Use an installed map
```bash
npm run deploy-map use $map_name
```
