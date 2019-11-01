class List < ApplicationRecord
  has_many :list_items
  validates :title, :description, presence: true
end
