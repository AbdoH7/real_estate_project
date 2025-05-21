"use client"
import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Autocomplete,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  Chip,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { createUnit } from '@/lib/api/units';
import { getProjects } from '@/lib/api/projects';

export default function AddUnitForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [amenity, setAmenity] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    location: '',
    amenities: [],
    price: '',
    area: '',
    bedroom_count: '',
    bathroom_count: '',
    furnished: false,
  });

  // Fetch projects on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };
    loadProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddAmenity = () => {
    if (amenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity.trim()]
      }));
      setAmenity('');
    }
  };

  const handleRemoveAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const numericFields = ['price', 'area', 'bedroom_count', 'bathroom_count'];
      const submitData = {
        ...formData,
      };

      // Convert string numbers to actual numbers
      numericFields.forEach(field => {
        submitData[field] = Number(submitData[field]);
      });

      // Add projectId if a project is selected
      if (selectedProject) {
        submitData.projectId = selectedProject.id;
      }

      console.log('Submitting unit data:', submitData);

      const result = await createUnit(submitData);
      console.log('Unit created successfully:', result);
      
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Detailed error:', error);
      setError(error.message || 'Failed to create unit. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter projects based on input
  const filterOptions = (options, { inputValue }) => {
    const searchText = inputValue.toLowerCase();
    return options.filter(option => 
      option.name.toLowerCase().includes(searchText) ||
      (option.developer?.name || '').toLowerCase().includes(searchText)
    );
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Add New Unit
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              InputProps={{
                inputProps: { min: 0, step: "0.01" }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Area (m²)"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              InputProps={{
                inputProps: { min: 0, step: "0.01" }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Bedrooms"
              name="bedroom_count"
              value={formData.bedroom_count}
              onChange={handleInputChange}
              InputProps={{
                inputProps: { min: 0 }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Bathrooms"
              name="bathroom_count"
              value={formData.bathroom_count}
              onChange={handleInputChange}
              InputProps={{
                inputProps: { min: 0 }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={projects}
              getOptionLabel={(option) => `${option.name}${option.developer ? ` - ${option.developer.name}` : ''}`}
              filterOptions={filterOptions}
              value={selectedProject}
              onChange={(_, newValue) => setSelectedProject(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Project"
                  placeholder="Select a project..."
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.furnished}
                  onChange={handleInputChange}
                  name="furnished"
                />
              }
              label="Furnished"
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Add Amenity"
                value={amenity}
                onChange={(e) => setAmenity(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAmenity();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={handleAddAmenity}
                      variant="contained"
                      sx={{ ml: 1 }}
                    >
                      Add
                    </Button>
                  ),
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.amenities.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => handleRemoveAmenity(index)}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Creating...' : 'Create Unit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
} 