# Use the specified version of the official Postgres image
FROM postgres:15.2

# Install PostGIS
RUN apt-get update \
    && apt-cache showpkg postgresql-15-postgis-3 \
    && apt-get install -y --no-install-recommends \
    postgis \
    postgresql-15-postgis-3 \
    postgresql-15-postgis-3-scripts
