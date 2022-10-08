import { literal, QueryInterface } from 'sequelize';
import {
  addYears,
  format,
  subYears,
  setMonth,
  setDate,
  setHours,
} from 'date-fns';
import { ModelAttributes } from 'sequelize/types/model';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  // ************Notes*************

// I considered just only one cinema

  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('movie_details', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      movie_name: { type: 'varchar' },
      movie_time: { type: 'timestamp' },
      show_room: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'show_room',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      booking_status: { type: "boolean", default: false },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('users', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: { type: 'varchar' },
      last_time: { type: 'timestamp' },
      type: { type: 'enum', default: "user"},
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('show_room', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('seats', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      seat_number: { type: "varchar" },
      seat_category: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'seat_category',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      show_room: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'show_room',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      price: { type: 'varchar' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('seat_category', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: { type: "varchar" },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('bookings', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      booking_number: { type: "varchar" },
      movie_details: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'movie_details',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      seat_details: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'seats',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      }, 
      show_room: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'show_room',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      user: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'user',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);
    // throw new Error('TODO: implement migration in task 4');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
