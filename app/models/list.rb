class List < ApplicationRecord
  has_many :list_items, dependent: :delete_all
  validates :title, :description, presence: true
end
