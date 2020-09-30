class AddImportHistory < ActiveRecord::Migration[6.0]
  def change
    create_table :imports do |t|
      t.integer :year
      t.integer :quarter
    end
  end
end
